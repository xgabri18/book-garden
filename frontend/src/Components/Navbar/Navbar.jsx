import NavbarSearch from "./NavbarSearch";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/outline";

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
        </Link>
      </div>
    </nav>
  );
};
