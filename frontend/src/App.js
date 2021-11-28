import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import { routes } from "./routes";
import AuthService from "./auth";

function App() {
  return (
    <>
      <Header />
      <Main>
        {routes.map((route, index) => (
          <Route
            path={route.url}
            component={route.component}
            exact={route.exact}
            key={index}
          />
        ))}
        {/*<Route path="/" component={HomeModule} exact />*/}
        {/*<Route path="/book-titles" component={BookTitleModule} />*/}
        {/*<Route path="/libraries" component={LibraryModule} />*/}
        {/*<Route path="/account" component={AccountModule} />*/}
        {/*<Route path="/admin" component={AdminModule} />*/}
      </Main>
      <Footer />
    </>
  );
}

export default withRouter(App);
