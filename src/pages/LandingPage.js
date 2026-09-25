import FeatureCard from '../components/landing/FeatureCard.js';
import HeroSection from '../components/landing/HeroSection.js';
import NavigationBar from '../components/landing/NavigationBar.js';

const features = [
  {
    icon: '⌁',
    title: 'Track effortlessly',
    description:
      'Add expenses in seconds and keep your daily spending organized.',
  },
  {
    icon: '◔',
    title: 'See the full picture',
    description:
      'Understand your habits with simple summaries and category insights.',
  },
  {
    icon: '↗',
    title: 'Spend with intention',
    description:
      'Make clearer decisions with a calm, focused view of your money.',
  },
];

/**
 * Displays the public landing page.
 *
 * @returns {JSX.Element} Landing page component.
 */
function LandingPage() {
  return (
    <div className="landing-page">
      <NavigationBar />

      <HeroSection />

      <section className="features-section" id="features">
        <div className="section-heading">
          <p className="hero-eyebrow">Everything you need</p>

          <h2>A clearer view of your everyday spending.</h2>

          <p>
            Starfleet Stash keeps the important things simple, so you can focus on
            building better financial habits.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="how-it-works-section" id="how-it-works">
        <div>
          <p className="hero-eyebrow">How it works</p>

          <h2>Small inputs. Better decisions.</h2>
        </div>

        <div className="steps-list">
          <p>
            <strong>01</strong>
            Add your daily expenses.
          </p>

          <p>
            <strong>02</strong>
            See category and spending summaries.
          </p>

          <p>
            <strong>03</strong>
            Use your insights to spend intentionally.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;