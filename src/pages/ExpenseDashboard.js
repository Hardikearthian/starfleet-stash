import { useEffect,useMemo,useState } from 'react';
import ExpenseForm from '../components/ExpenseForm.js';
import { createExpense,deleteExpense,loadExpenses, } from '../services/expenseService.js';
import ExpenseList from '../components/ExpenseList.js';
import ExpenseSummary from '../components/ExpenseSummary.js';
import ExpenseFilter from '../components/ExpenseFilter.js';
import CategoryChart from '../components/CategoryChart.js';
import { UserButton } from '@clerk/react';
import { useAuth } from '@clerk/react';
/**
 * Displays the main expense tracker page.
 *
 * @returns {JSX.Element} The expense dashboard view.
 */
function ExpenseDashboard() {
 const [expenses, setExpenses] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const { getToken } = useAuth();

useEffect(() => {
  const loadSavedExpenses = async () => {
    try {
      const savedExpenses = await loadExpenses(getToken);

      setExpenses(savedExpenses);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  loadSavedExpenses();
}, []);





const categories = useMemo(() => {
  return [
    ...new Set(
      expenses.map((expense) => expense.category),
    ),
  ];
}, [expenses]);

const filteredExpenses = useMemo(() => {
  if (selectedCategory === 'All') {
    return expenses;
  }

  return expenses.filter(
    (expense) => expense.category === selectedCategory,
  );
}, [expenses, selectedCategory]);







  /**
   * Creates an expense through the backend and updates the list.
   *
   * @param {Object} expenseData - Form data submitted by the user.
   * @returns {Promise<void>}
   */
  const handleCreateExpense = async (expenseData) => {
    const createdExpense = await createExpense(expenseData, getToken);

    setExpenses((currentExpenses) => [
      createdExpense,
      ...currentExpenses,
    ]);
  };






  /**
 * Deletes an expense through the backend and updates the list.
 *
 * @param {number} expenseId - ID of the expense to delete.
 * @returns {Promise<void>}
 */
const handleDeleteExpense = async (expenseId) => {
  try {
    await deleteExpense(expenseId,getToken);

    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    );
  } catch (error) {
    setErrorMessage(error.message);
  }
};

  return (

    <main className="dashboard-page">
      <header className="dashboard-header">
  <div>
    <p>PERSONAL FINANCE</p>
    <h1>Expense Tracker</h1>
  </div>

  <UserButton />
</header>
      <ExpenseSummary expenses={expenses} />
      <CategoryChart expenses={expenses} />
      <ExpenseForm onSubmitExpense={handleCreateExpense} />

    <h2>Saved Expenses</h2>

{isLoading && <p>Loading expenses...</p>}

{errorMessage && <p>{errorMessage}</p>}

{!isLoading && !errorMessage && expenses.length === 0 && (
  <p>No expenses added yet.</p>
)}

{!isLoading && !errorMessage && expenses.length > 0 && (
  <ul>
    {expenses.map((expense) => (
      <li key={expense.id}>
        ₹{expense.amount} - {expense.category} - {expense.note}
      </li>
    ))}
  </ul>
)}
<ExpenseFilter
  categories={categories}
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>

<ExpenseList
  expenses={filteredExpenses}
  onDeleteExpense={handleDeleteExpense}
/>

    </main>
  );
}

export default ExpenseDashboard;