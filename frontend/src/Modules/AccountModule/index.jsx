import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountLoginModule from "./AccountLoginModule";
import AccountRegisterModule from "./AccountRegisterModule";
import AccountProfileModule from "./AccountProfileModule";

const AccountModule = () => {
  const { path } = useRouteMatch();

  /** @TODO: Check if logged in */

  return (
    <Switch>
      <Route path={`${path}/login`} component={AccountLoginModule} />
      <Route path={`${path}/register`} component={AccountRegisterModule} />
      <Route path={`${path}/profile`} component={AccountProfileModule} />
    </Switch>
  );
};

export default AccountModule;
