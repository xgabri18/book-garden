import NavbarSearch from "./NavbarSearch";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  CubeTransparentIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { authenticated, role, username } from "../../middlewares";
import AuthService from "../../auth";

export const Navbar = () => {
  return (
    <nav className="Navbar Container">
      <Link to="/" className="Navbar-logo">
        <b>BOOK</b>Garden
      </Link>
      <div className="Navbar-items">
        <NavbarSearch />

        <Link to="/account" className="Navbar-link">
          <UserIcon className="h-6" />
          <span className="hidden xl:inline">{username}</span>
        </Link>

        {AuthService.isAuthenticated() && AuthService.isAdmin() && (
          <Link to="/admin" className="Navbar-link">
            <CubeTransparentIcon className="h-6 inline mr-2" />
            <span className="hidden xl:inline">Admin</span>
          </Link>
        )}

        {AuthService.isAuthenticated() && (
          <Link to="/admin" className="Navbar-link">
            <LogoutIcon className="h-6 inline mr-2" />
            <span className="hidden xl:inline">Log out</span>
          </Link>
        )}
      </div>
    </nav>
  );
};
