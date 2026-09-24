import database from '../database/database.js';

const selectAllExpenses = database.prepare(`
  SELECT id, amount, category, date, note, created_at
  FROM expenses
WHERE user_id = ?
ORDER BY date DESC, id DESC
`);

export function findAllExpenses(userId) {
  return selectAllExpenses.all(userId);
}

const insertExpense = database.prepare(`
  INSERT INTO expenses (
  user_id,
  amount,
  category,
  date,
  note
)
VALUES (
  @userId,
  @amount,
  @category,
  @date,
  @note
)
`);

const selectExpenseById = database.prepare(`
  SELECT id, amount, category, date, note, created_at
  FROM expenses
 WHERE id = ?
AND user_id = ?
`);

export function createExpense(expenseData, userId) {
  const result = insertExpense.run({
    userId,
    amount: expenseData.amount,
    category: expenseData.category,
    date: expenseData.date,
    note: expenseData.note || '',
  });

  return selectExpenseById.get(
    result.lastInsertRowid,
    userId,
  );
}

/*for deleting an expense*/

const deleteExpenseStatement = database.prepare(`
 DELETE FROM expenses
WHERE id = ?
AND user_id = ?
`);

export function removeExpense(expenseId, userId) {
  const result = deleteExpenseStatement.run(
    expenseId,
    userId,
  );

  return result.changes > 0;
}