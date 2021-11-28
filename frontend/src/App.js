import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import { routes } from "./routes";
import { NotFoundError } from "./Components/Errors/NotFoundError";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          {routes.map((route, index) => (
            <Route
              path={route.url}
              component={route.component}
              exact={route.exact}
              key={index}
            />
          ))}
          <Route path="/" component={NotFoundError} />
        </Switch>
      </Main>
      <Footer />
    </>
  );
}

export default withRouter(App);
