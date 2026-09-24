const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api/expenses';




/**
 * Sends an HTTP request to the expense API.
 *
 * @param {string} endpoint - Additional API path.
 * @param {Object} options - Fetch request options.
 * @returns {Promise<Object>} Parsed API response.
 */



async function request(endpoint = '',options = {},getToken,) {
  const token = await getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'API request failed');
  }

  return result;
}





/**
 * Creates a new expense through the backend API.
 *
 * @param {Object} expenseData - Expense information.
 * @returns {Promise<Object>} Created expense.
 */



export async function createExpense(expenseData, getToken,) {
  const result = await request(
    '',
    {
      method: 'POST',
      body: JSON.stringify(expenseData),
    },
    getToken,
  );

  return result.data;
}



/**
 * Gets all expenses from the backend API.
 *
 * @returns {Promise<Array>} Saved expenses.
 */



export async function loadExpenses(getToken) {
  const result = await request('', {}, getToken);

  return result.data;
}





/**
 * Deletes an expense through the backend API.
 *
 * @param {number} expenseId - ID of the expense to delete.
 * @returns {Promise<Object>} API response.
 */




export async function deleteExpense(
  expenseId,
  getToken,
) {
  return request(
    `/${expenseId}`,
    {
      method: 'DELETE',
    },
    getToken,
  );
}