import { Route, Switch, useRouteMatch } from "react-router-dom";
import BookTitleListModule from "./BookTitleListModule";
import BookTitleShowModule from "./BookTitleShowModule";

const BookTitleModule = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} component={BookTitleListModule} exact />
      <Route path={`${path}/:id`} component={BookTitleShowModule} />
    </Switch>
  );
};

export default BookTitleModule;
