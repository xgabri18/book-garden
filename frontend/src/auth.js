import { Redirect } from "react-router-dom";

class User {
  constructor() {
    this.id = null;
    this.username = "";
    this.type = "";
    this.employee = null;
    this.authenticated = false;
  }

  login(id, username, type, employee) {
    this.authenticated = true;
    this.id = id;
    this.username = username;
    this.type = type;
    this.employee = employee;

    return this.employee ? (
      <Redirect to="/admin" />
    ) : (
      <Redirect to="/account/profile" />
    );
  }

  logout() {
    this.id = null;
    this.username = "";
    this.type = "";
    this.employee = null;
    this.authenticated = false;
  }

  isAuthenticated() {
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

export default new User();
