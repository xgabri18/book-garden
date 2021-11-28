import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AccountLoginModule from "./AccountLoginModule";
import AccountRegisterModule from "./AccountRegisterModule";
import AccountProfileModule from "./AccountProfileModule";
import { authenticated, AuthRoute } from "../../middlewares";
import AuthService from "../../auth";

const AccountModule = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/login`} component={AccountLoginModule} />
      <Route path={`${path}/register`} component={AccountRegisterModule} />
      <AuthRoute path={`${path}/profile`} component={AccountProfileModule} />
      <Route path="/" component={AccountSessionHandler} />
    </Switch>
  );
};

const AccountSessionHandler = () => {
  return AuthService.isAuthenticated() ? (
    <Redirect to={`account/profile`} />
  ) : (
    <Redirect to={`account/login`} />
  );
};

export default AccountModule;
