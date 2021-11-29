import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import {
  CubeTransparentIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { Button } from "../Ui/Button";
import auth from "../../auth";

export const Navbar = () => {
  const history = useHistory();

  return (
    <nav className="Navbar Container">
      <Link to="/" className="Navbar-logo">
        <b>BOOK</b>Garden
      </Link>
      <div className="Navbar-items">
        <Link to="/account" className="Navbar-link">
          <UserIcon className="h-6 mr-2" />
          <span className="hidden xl:inline">Account</span>
        </Link>
        {auth.isAuthenticated() && auth.allowedDashboard() && (
          <Link to="/admin" className="Navbar-link">
            <CubeTransparentIcon className="h-6 inline mr-2" />
            <span className="hidden xl:inline">Dashboard</span>
          </Link>
        )}

        {auth.isAuthenticated() && (
          <Button
            type="button"
            onClick={() =>
              auth
                .logout()
                .then((loggedOut) =>
                  loggedOut
                    ? (window.location.href = "/")
                    : console.log("Can not log out.")
                )
            }
            className="Navbar-link shadow-none"
            text="Log out"
            icon={<LogoutIcon className="h-6 mr-2" />}
            showText={"xl"}
          />
        )}
      </div>
    </nav>
  );
};
