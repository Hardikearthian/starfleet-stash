/**
 * Displays one landing page feature.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.icon - Feature icon.
 * @param {string} props.title - Feature title.
 * @param {string} props.description - Feature description.
 * @returns {JSX.Element} Feature card component.
 */
function FeatureCard({ icon, title, description }) {
  return (
    <article className="feature-card">
      <span className="feature-icon">{icon}</span>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}

export default FeatureCard;