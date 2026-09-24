/**
 * Displays saved expenses in a list.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.expenses - Expenses received from the backend.
 * @param {Function} props.onDeleteExpense - Deletes an expense by ID.
 * @returns {JSX.Element} The expense list component.
 */
function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return <p>No expenses added yet.</p>;
  }

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <strong>₹{expense.amount}</strong>
          {' - '}
          <span>{expense.category}</span>
          {' - '}
          <span>{expense.note || 'No note'}</span>
          {' - '}
          <span>{expense.date}</span>

          <button
            type="button"
            onClick={() => onDeleteExpense(expense.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;