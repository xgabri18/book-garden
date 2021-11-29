import { Redirect, Route } from "react-router-dom";
import { NotAuthorizedError } from "./Components/Errors/NotAuthorizedError";
import { isArray } from "@craco/craco/lib/utils";
import auth from "./auth";

/**
 * Sets the route for Authenticated Users only.
 *
 * @param rest            Rest properties for Route
 * @return {JSX.Element}
 * @constructor
 */
export const AuthRoute = ({ ...rest }) => {
  return auth.isAuthenticated() ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/account/login" />
  );
};

/**
 * Sets the route for Admin, Librarian, Distributor only.
 *
 * @param roles           Roles that have access to this route
 * @param librarian       Indicates that the librarian or admin can access
 * @param rest            Rest properties for Route
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
export const ProtectedRoute = ({ roles, librarian, ...rest }) => {
  // Get id_library from URL
  const idLibrarian =
    rest.computedMatch.params.id || rest.computedMatch.params.idLibrary;

  // Check if role is allowed
  const hasRole =
    (isArray(roles) && roles.find((role) => role === auth.getUserType())) ||
    roles === "all";

  // Check if librarian is allowed
  const isLibrarian =
    librarian && !auth.isAdmin()
      ? librarian &&
        auth.isLibrarian() &&
        auth.getEmployeeLibrary() === parseInt(idLibrarian)
      : true;

  return auth.isAuthenticated() && hasRole && isLibrarian ? (
    <Route {...rest} />
  ) : (
    <NotAuthorizedError />
  );
};

/**
 * Converts date into human readable format.
 *
 * Format: DD.MM.YYYY HH:MM
 *
 * @param date
 * @return {string}
 */
export const convertDate = (date) => {
  let d = new Date(date);
  return (
    d.getDate() +
    "." +
    d.getMonth() +
    "." +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes()
  );
};

/**
 * Formats the price to € currency
 *
 * Format: XX.XX€
 *
 * @param price
 * @return {string}
 */
export const convertPrice = (price) => {
  return price.toFixed(2) + "€";
};
