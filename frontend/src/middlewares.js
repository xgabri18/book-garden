import { Redirect, Route } from "react-router-dom";
import { NotAuthorizedError } from "./Components/Errors/NotAuthorizedError";
import { isArray } from "@craco/craco/lib/utils";
import AuthService from "./auth";

/** @todo: DELETE AND GET THIS FROM DB */

export const authenticated = false;
export const username = "user";
export const role = "admin";
export const idLibrary = 1;

export const AuthRoute = ({ ...rest }) => {
  return AuthService.isAuthenticated() ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/account/login" />
  );
};

export const AdminRoute = ({ roles, ...rest }) => {
  return AuthService.isAuthenticated() &&
    ((isArray(roles) && roles.find((r) => r === AuthService.getUserType())) ||
      roles === "all") ? (
    <Route {...rest} />
  ) : (
    <NotAuthorizedError />
  );
};
