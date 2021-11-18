import { Route, Switch, useRouteMatch } from "react-router-dom";
import { DashboardModule } from "./DashboardModule";

const AdminModule = () => {
  const { path } = useRouteMatch();

  /** todo: Check if logged in && check permissions */

  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={DashboardModule} />
    </Switch>
  );
};

export default AdminModule;
