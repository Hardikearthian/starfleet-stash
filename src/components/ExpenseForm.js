import { useState } from 'react';

const categoryOptions = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Other',
];

const initialFormData = {
  amount: '',
  category: 'Food',
  date: '',
  note: '',
};

/**
 * Collects expense information from the user.
 *
 * @returns {JSX.Element} The expense form component.
 */
function ExpenseForm({ onSubmitExpense }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

  /**
   * Updates one form field without changing the other fields.
   *
   * @param {Object} event - The input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

/**
 * Sends valid form data to the parent page.
 *
 * @param {Object} event - The form submit event.
 */
/**
 * Sends valid form data to the parent page.
 *
 * @param {Object} event - The form submit event.
 */
const handleSubmit = async (event) => {
  event.preventDefault();

  setErrorMessage('');
  setIsSubmitting(true);

  try {
    await onSubmitExpense({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData(initialFormData);
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <section>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categoryOptions.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="note">Note</label>
          <input
            id="note"
            name="note"
            type="text"
            value={formData.note}
            onChange={handleChange}
            placeholder="Example: Lunch"
          />
        </div>
            {errorMessage && <p role="alert">{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;