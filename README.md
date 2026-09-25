# Starfleet Stash

Starfleet Stash is a complete expense tracking application that lets users log their daily expenses and see their expenditure summaries based on categories.

## Features

- Authentication with Clerk
- Expense logging with amount, category, date, and note
- Viewing of recorded expenses
- Deleting of recorded expenses
- Filtering of recorded expenses with category and date
- Spending summary of current week
- Spending summary of current month
- Spending summary of previous month
- Summary of expenses according to each category
- Responsive landing page and dashboard
- Mobile compatible UI

## Tech Stack

### Frontend

- React
- Vite
- Clerk React
- CSS

### Backend

- Node.js
- Express
- SQLite
- better-sqlite3
- Clerk Express

### Deployment

- Frontend: Vercel
- Backend: Render

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── landing/
│   └── dashboard/
├── pages/
├── services/
├── utils/
├── App.js
└── index.jsx

server/
├── config/
├── controllers/
├── database/
├── middleware/
├── routes/
├── services/
└── server.js
