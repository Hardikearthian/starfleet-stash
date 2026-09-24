import { calculateCategoryTotals } from '../utils/expenseUtils.js';

/**
 * Displays spending totals by category.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.expenses - Expense records.
 * @returns {JSX.Element} Category breakdown chart.
 */
function CategoryChart({ expenses }) {
  const categoryTotals = calculateCategoryTotals(expenses);
  const maximumAmount = categoryTotals[0]?.amount || 1;

  if (categoryTotals.length === 0) {
    return (
      <section>
        <h2>Category Breakdown</h2>
        <p>No category data available.</p>
      </section>
    );
  }

  return (
<section className="category-chart-section">
      <h2>Category Breakdown</h2>

      {categoryTotals.map(({ category, amount }) => {
        const percentage = (amount / maximumAmount) * 100;

        return (
          <div key={category}>
            <div className="category-chart-label">
              <span>{category}</span>
              <strong>₹{amount.toLocaleString('en-IN')}</strong>
            </div>

            <div className="chart-bar-background">
              <div
                className="chart-bar"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CategoryChart;