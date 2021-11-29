import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AccountLoginModule from "./AccountLoginModule";
import AccountRegisterModule from "./AccountRegisterModule";
import AccountProfileModule from "./AccountProfileModule";
import { AuthRoute } from "../../middlewares";
import { AccountReservationModule } from "./AccountReservationModule";
import auth from "../../auth";
import { AccountBorrowingModule } from "./AccountBorrowingModule";
import { AccountVotingModule } from "./AccountVotingModule";

const AccountModule = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/login`} component={AccountLoginModule} />
      <Route path={`${path}/register`} component={AccountRegisterModule} />
      <AuthRoute path={`${path}/profile`} component={AccountProfileModule} />
      <AuthRoute
        path={`${path}/reservations`}
        component={AccountReservationModule}
        exact
      />
      <AuthRoute
        path={`${path}/borrowings`}
        component={AccountBorrowingModule}
      />
      <AuthRoute path={`${path}/voting`} component={AccountVotingModule} />
      <Route path="/" component={AccountSessionHandler} />
    </Switch>
  );
};

const AccountSessionHandler = () => {
  return auth.isAuthenticated() ? (
    <Redirect to={`/account/profile`} />
  ) : (
    <Redirect to={`/account/login`} />
  );
};

export default AccountModule;
