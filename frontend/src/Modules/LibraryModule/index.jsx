import { Route, Switch, useRouteMatch } from "react-router-dom";
import LibraryList from "./LibraryList";
import LibraryShow from "./LibraryShow";

export const LibraryModule = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} component={LibraryList} exact />
      <Route path={`${path}/:id`} component={LibraryShow} />
    </Switch>
  );
};

export default LibraryModule;
