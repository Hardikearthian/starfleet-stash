import {
  calculateCurrentMonthTotal,
  calculateCurrentWeekTotal,
  calculatePreviousMonthTotal,
} from '../utils/expenseUtils.js';

/**
 * Formats an amount as Indian currency.
 *
 * @param {number} amount - Amount to format.
 * @returns {string} Formatted currency amount.
 */
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Displays weekly and monthly expense metrics.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.expenses - Expense records.
 * @returns {JSX.Element} Expense summary cards.
 */
function ExpenseSummary({ expenses }) {
  const currentWeekTotal =
    calculateCurrentWeekTotal(expenses);

  const currentMonthTotal =
    calculateCurrentMonthTotal(expenses);

  const previousMonthTotal =
    calculatePreviousMonthTotal(expenses);

  return (
    <section className="summary-section">
      <div className="summary-section-heading">
        <p>OVERVIEW</p>
        <h2>Your spending at a glance</h2>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span>Current week</span>
          <strong>{formatCurrency(currentWeekTotal)}</strong>
          <small>Monday to today</small>
        </article>

        <article className="summary-card">
          <span>Current month</span>
          <strong>{formatCurrency(currentMonthTotal)}</strong>
          <small>Month to date</small>
        </article>

        <article className="summary-card">
          <span>Previous month</span>
          <strong>{formatCurrency(previousMonthTotal)}</strong>
          <small>Complete previous month</small>
        </article>

        <article className="summary-card">
          <span>Total entries</span>
          <strong>{expenses.length}</strong>
          <small>Saved expenses</small>
        </article>
      </div>
    </section>
  );
}

export default ExpenseSummary;