/**
 * Calculates the total amount of all expenses.
 *
 * @param {Array} expenses - Expense records.
 * @returns {number} Total expense amount.
 */
export function calculateTotalAmount(expenses) {
  return expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );
}

/**
 * Calculates the average expense amount.
 *
 * @param {Array} expenses - Expense records.
 * @returns {number} Average expense amount.
 */
export function calculateAverageAmount(expenses) {
  if (expenses.length === 0) {
    return 0;
  }

  return calculateTotalAmount(expenses) / expenses.length;
}

/**
 * Groups expenses by category and calculates category totals.
 *
 * @param {Array} expenses - Expense records.
 * @returns {Array} Category totals sorted by amount.
 */
export function calculateCategoryTotals(expenses) {
  const categoryTotals = expenses.reduce((totals, expense) => {
    const category = expense.category;
    const amount = Number(expense.amount);

    totals[category] = (totals[category] || 0) + amount;

    return totals;
  }, {});

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((firstCategory, secondCategory) => {
      return secondCategory.amount - firstCategory.amount;
    });
}


/**
 * Converts an expense date string into a local Date object.
 *
 * @param {string} expenseDate - Date in YYYY-MM-DD format.
 * @returns {Date} Parsed local date.
 */
function parseExpenseDate(expenseDate) {
  return new Date(`${expenseDate}T00:00:00`);
}

/**
 * Returns the total amount for expenses inside a date range.
 *
 * @param {Array} expenses - Expense records.
 * @param {Date} rangeStart - Inclusive range start.
 * @param {Date} rangeEnd - Exclusive range end.
 * @returns {number} Total amount inside the range.
 */
function calculateDateRangeTotal(
  expenses,
  rangeStart,
  rangeEnd,
) {
  return expenses
    .filter((expense) => {
      const expenseDate = parseExpenseDate(expense.date);

      return (
        expenseDate >= rangeStart &&
        expenseDate < rangeEnd
      );
    })
    .reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );
}

/**
 * Calculates the total spent from Monday to today.
 *
 * @param {Array} expenses - Expense records.
 * @param {Date} referenceDate - Date used for calculation.
 * @returns {number} Current week total.
 */
export function calculateCurrentWeekTotal(
  expenses,
  referenceDate = new Date(),
) {
  const currentDate = new Date(referenceDate);
  const dayOfWeek = currentDate.getDay();
  const daysFromMonday = (dayOfWeek + 6) % 7;

  const weekStart = new Date(currentDate);
  weekStart.setDate(
    currentDate.getDate() - daysFromMonday,
  );
  weekStart.setHours(0, 0, 0, 0);

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return calculateDateRangeTotal(
    expenses,
    weekStart,
    tomorrow,
  );
}

/**
 * Calculates the total spent in the current calendar month.
 *
 * @param {Array} expenses - Expense records.
 * @param {Date} referenceDate - Date used for calculation.
 * @returns {number} Current month total.
 */
export function calculateCurrentMonthTotal(
  expenses,
  referenceDate = new Date(),
) {
  const monthStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    1,
  );

  const tomorrow = new Date(referenceDate);
  tomorrow.setDate(referenceDate.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return calculateDateRangeTotal(
    expenses,
    monthStart,
    tomorrow,
  );
}

/**
 * Calculates the total spent in the previous calendar month.
 *
 * @param {Array} expenses - Expense records.
 * @param {Date} referenceDate - Date used for calculation.
 * @returns {number} Previous month total.
 */
export function calculatePreviousMonthTotal(
  expenses,
  referenceDate = new Date(),
) {
  const previousMonthStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() - 1,
    1,
  );

  const currentMonthStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    1,
  );

  return calculateDateRangeTotal(
    expenses,
    previousMonthStart,
    currentMonthStart,
  );
}