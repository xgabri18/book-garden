import NavbarSearch from "./NavbarSearch";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import {
  CubeTransparentIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import AuthService from "../../auth";
import { Button } from "../Ui/Button";

export const Navbar = () => {
  const history = useHistory();

  return (
    <nav className="Navbar Container">
      <Link to="/" className="Navbar-logo">
        <b>BOOK</b>Garden
      </Link>
      <div className="Navbar-items">
        <NavbarSearch />
        <Link to="/account" className="Navbar-link">
          <UserIcon className="h-6 mr-2" />
          <span className="hidden xl:inline">Account</span>
        </Link>
        {AuthService.isAuthenticated() && AuthService.allowedDashboard() && (
          <Link to="/admin" className="Navbar-link">
            <CubeTransparentIcon className="h-6 inline mr-2" />
            <span className="hidden xl:inline">Admin</span>
          </Link>
        )}

        {AuthService.isAuthenticated() && (
          <Button
            type="button"
            onClick={() =>
              AuthService.logout().then((loggedIn) =>
                loggedIn ? history.push("/") : console.log("Can not log out.")
              )
            }
            className="Navbar-link"
            text="Log out"
            icon={<LogoutIcon className="h-6 mr-2" />}
            hideTextSm
          />
        )}
      </div>
    </nav>
  );
};
