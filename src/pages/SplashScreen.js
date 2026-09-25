import logoImage from '../assets/starfleet-stash-logo.png';

/**
 * Displays the initial loading screen for the application.
 *
 * @returns {JSX.Element} The splash screen.
 */
function SplashScreen() {
  return (
    <main className="splash-screen">
      <div className="splash-content">
    <img
  src={logoImage}
  alt="Starfleet Stash logo"
  className="splash-logo-image"
/>

        <h1></h1>

        <p></p>

        <div
          className="loading-indicator"
          role="status"
          aria-label="Loading application"
        />
      </div>
    </main>
  );
}

export default SplashScreen;