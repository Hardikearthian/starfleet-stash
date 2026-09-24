import { getAuth } from '@clerk/express';
import { findAllExpenses,createExpense,removeExpense,} from '../services/expenseService.js';





export function getExpenses(request, response) {
  const { userId } = getAuth(request);

  try {
    const expenses = findAllExpenses(userId);

    return response.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error('Failed to fetch expenses:', error);

    return response.status(500).json({
      success: false,
      message: 'Unable to fetch expenses',
    });
  }
}

const allowedCategories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Other',
];




export function addExpense(request, response) {
 const { userId } = getAuth(request);

  const { amount, category, date, note } = request.body;

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return response.status(400).json({
      success: false,
      message: 'Amount must be greater than zero',
    });
  }

  if (!allowedCategories.includes(category)) {
    return response.status(400).json({
      success: false,
      message: 'Invalid category',
    });
  }

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return response.status(400).json({
      success: false,
      message: 'A valid date is required',
    });
  }

  try {
    const expense = createExpense({
      amount: numericAmount,
      category,
      date,
      note: typeof note === 'string' ? note.trim() : '',
    },userId,);

    return response.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error('Failed to create expense:', error);

    return response.status(500).json({
      success: false,
      message: 'Unable to create expense',
    });
  }
}


/* delete controller added*/


export function deleteExpense(request, response) {
   const { userId } = getAuth(request);
 
  const expenseId = Number(request.params.id);

  if (!Number.isInteger(expenseId) || expenseId <= 0) {
    return response.status(400).json({
      success: false,
      message: 'Expense ID must be a positive integer',
    });
  }

  try {
    const deleted = removeExpense(expenseId,userId);

    if (!deleted) {
      return response.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    return response.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete expense:', error);

    return response.status(500).json({
      success: false,
      message: 'Unable to delete expense',
    });
  }
}