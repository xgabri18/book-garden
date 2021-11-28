import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { AdminRoute, authenticated, role } from "../../middlewares";
import { adminRoutes } from "../../routes";
import { NotAuthorizedError } from "../../Components/Errors/NotAuthorizedError";
import AuthService from "../../auth";

const AdminModule = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={AdminSessionHandler} />
      {adminRoutes.map((route, index) => (
        <AdminRoute
          key={index}
          path={path + route.url}
          component={route.component}
          roles={route.roles}
          exact={route.exact}
        />
      ))}
    </Switch>
  );
};

const AdminSessionHandler = () => {
  return !AuthService.isAuthenticated() || !AuthService.allowedDashboard() ? (
    <NotAuthorizedError />
  ) : (
    <Redirect to={`/admin/dashboard`} />
  );
};

export default AdminModule;
