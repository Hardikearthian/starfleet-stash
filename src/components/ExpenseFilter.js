/**
 * Provides category filtering for expenses.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.categories - Available category names.
 * @param {string} props.selectedCategory - Current selected category.
 * @param {Function} props.onCategoryChange - Updates the selected category.
 * @returns {JSX.Element} The expense filter component.
 */
function ExpenseFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div>
      <label htmlFor="categoryFilter">
        Filter by category
      </label>

      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All</option>

        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExpenseFilter;