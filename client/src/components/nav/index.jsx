import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import MainSearch from "../MainSearch";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/home">
              NIGHTCAP
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/profile">
              <UserProfilePicture user={currentUser} />
            </Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
            <MainSearch />
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/home">
              NIGHTCAP
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="mx-1">
            <MainSearch />
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
