import { Route, Switch, useRouteMatch } from "react-router-dom";
import BookTitleListModule from "./BookTitle/BookTitleListModule";
import BookTitleShowModule from "./BookTitle/BookTitleShowModule";

const BookTitleModule = () => {
  let { path, url } = useRouteMatch();

  console.log(path);

  return (
    <>
      <Switch>
        <Route path={`${path}`} component={BookTitleListModule} exact />
        <Route path={`${path}/:id`} component={BookTitleShowModule} />
      </Switch>
    </>
  );
};

export default BookTitleModule;
