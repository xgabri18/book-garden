import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import HomeModule from "./Modules/HomeModule";
import BookTitleModule from "./Modules/BookTitleModule";
import LibraryModule from "./Modules/LibraryModule";
import AccountModule from "./Modules/AccountModule";
import AdminModule from "./Modules/AdminModule";

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/" component={HomeModule} exact />
          <Route path="/book-titles" component={BookTitleModule} />
          <Route path="/libraries" component={LibraryModule} />
          <Route path="/account" component={AccountModule} />
          <Route path="/admin" component={AdminModule} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;
