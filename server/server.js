import expenseRoutes from './routes/expenseRoutes.js';
import express from 'express';
import cors from 'cors';
import database from './database/database.js';
import {
  clerkAuthMiddleware,
  requireAuthentication,
} from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(clerkAuthMiddleware);
app.use('/api/expenses', expenseRoutes);


app.use(
  '/api/expenses',
  requireAuthentication,
  expenseRoutes,
);

app.get('/api/health', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Expense Tracker API is running',
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
