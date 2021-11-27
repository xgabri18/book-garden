import { Redirect, Route } from "react-router-dom";
import { NotAuthorizedError } from "./Components/Errors/NotAuthorizedError";
import { isArray } from "@craco/craco/lib/utils";

/** @todo: DELETE AND GET THIS FROM DB */

export const authenticated = false;
export const username = "user";
export const role = "admin";
export const idLibrary = 1;

export const AuthRoute = ({ ...rest }) => {
  return authenticated ? <Route {...rest} /> : <Redirect to="/account/login" />;
};

export const AdminRoute = ({ roles, ...rest }) => {
  return authenticated &&
    ((isArray(roles) && roles.find((r) => r === role)) || roles === "all") ? (
    <Route {...rest} />
  ) : (
    <NotAuthorizedError />
  );
};
