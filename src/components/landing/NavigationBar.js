import { Show,SignInButton,SignUpButton,UserButton,} from '@clerk/react';
import logoImage from '../../assets/starfleet-stash-logo.png';
/**
 * Displays the landing page navigation.
 *
 * @returns {JSX.Element} The navigation bar.
 */
function NavigationBar() {
  return (
    <nav className="landing-navigation">
      <a className="brand" href="/">
       <img src={logoImage} alt="Starfleet Stash logo" 
       className="brand-logo-image"/>
        <span>STARFLEET STASH</span>
      </a>

      <div className="navigation-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button type="button" className="secondary-button">
              Sign in
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button type="button">Get started</button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}

export default NavigationBar;