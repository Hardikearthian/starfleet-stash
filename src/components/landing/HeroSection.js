import { SignUpButton } from '@clerk/react';
/**
 * Displays the main landing page introduction.
 *
 * @returns {JSX.Element} The hero section.
 */
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-eyebrow">A calmer way to manage money</p>

        <h1>
          Make every rupee
          <span> count.</span>
        </h1>

        <p className="hero-description">
          Spendwise helps you track daily expenses, understand your habits,
          and take control of your financial direction.
        </p>

        <div className="hero-actions">
         <SignUpButton mode="modal">
  <button type="button">Start tracking free</button>
</SignUpButton>
          <a href="#how-it-works">See how it works <span>↓</span></a>
        </div>

        <div className="hero-trust">
          <span className="trust-avatars">✦ ◦ ✧</span>
          <span>Simple tracking for everyday spending</span>
        </div>
      </div>

      <div className="hero-preview" aria-label="Expense summary preview">
        <div className="preview-glow" />

        <div className="preview-card preview-main-card">
          <div className="preview-card-header">
            <div>
              <span className="preview-label">TOTAL SPENT</span>
              <strong>₹24,860</strong>
            </div>

            <span className="preview-period">This month⌄</span>
          </div>

          <div className="preview-chart">
            <span className="chart-line chart-line-one" />
            <span className="chart-line chart-line-two" />
            <span className="chart-line chart-line-three" />
            <span className="chart-line chart-line-four" />
          </div>

          <div className="preview-chart-labels">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        <div className="preview-card preview-category-card">
          <span className="preview-label">TOP CATEGORY</span>
          <strong>Food</strong>
          <span className="category-amount">₹8,420</span>
          <span className="category-progress">
            <span />
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;