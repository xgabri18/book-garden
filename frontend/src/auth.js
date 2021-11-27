import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "querystring";
import { createAPI } from "./api";

class AuthService {
  constructor() {
    this.id = null;
    this.username = "";
    this.type = "";
    this.employee = null;
    this.authenticated = false;
  }

  login(username, password) {
    axios
      .post(createAPI("session"), qs.stringify({ username, password }))
      .then((response) => {
        console.log(response.data);
      });
    // this.id = id;
    // this.username = username;
    // this.type = type;
    // this.employee = employee;
    //
    // return this.employee ? (
    //   <Redirect to="/admin" />
    // ) : (
    //   <Redirect to="/account/profile" />
    // );
  }

  logout() {
    this.id = null;
    this.username = "";
    this.type = "";
    this.employee = null;
    this.authenticated = false;
  }

  isAuthenticated() {
    axios.get(createAPI("session")).then((response) => {
      console.log(response.data);
    });
    return this.authenticated;
  }

  isAdmin() {
    return this.isAuthenticated() && this.type === "admin";
  }

  isLibrarian() {
    return this.isAuthenticated() && this.type === "librarian";
  }

  isDistributor() {
    return this.isAuthenticated() && this.type === "distributor";
  }

  isCustomer() {
    return this.isAuthenticated() && this.type === "customer";
  }
}

export default new AuthService();
