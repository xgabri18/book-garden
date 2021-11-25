import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import { routes } from "./routes";
import User from "./auth";

function App() {
  return (
    <Router>
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
          {/*<Route path="/" component={HomeModule} exact />*/}
          {/*<Route path="/book-titles" component={BookTitleModule} />*/}
          {/*<Route path="/libraries" component={LibraryModule} />*/}
          {/*<Route path="/account" component={AccountModule} />*/}
          {/*<Route path="/admin" component={AdminModule} />*/}
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
