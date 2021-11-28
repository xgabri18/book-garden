import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "querystring";
import { createAPI } from "./api";

class AuthService {
  constructor() {
    this.init();
  }

  init() {
    this.authenticated = true;
    this.id = 1;
    this.username = "admin";
    this.type = "admin";
    this.library_id = null;
    this.name = "Joe";
    this.surname = "Doe";
    this.profiledesc = "I love 50 shades of gray";
  }

  login(username, password) {
    // Login
    return axios
      .post(createAPI("session"), qs.stringify({ username, password }))
      .then((response) => {
        this.authenticated = true;
        this.id = response.data.data.user_id;
        this.type = this.convertToUserType(response.data.data.user_type);

        // Get info
        return axios
          .get(createAPI("person/:id", { id: this.id }))
          .then((response) => {
            this.username = response.data.data.username;
            this.library_id = response.data.data.library_id;
            this.name = response.data.data.name;
            this.surname = response.data.data.surname;
            this.profiledesc = response.data.data.profiledesc;

            return this.allowedDashboard ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/account/profile" />
            );
          });
      });
  }

  logout() {
    this.init();
    return <Redirect to="/" />;
  }

  isAuthenticated() {
    // return true;
    return axios
      .get(createAPI("session"))
      .then(
        (response) =>
          this.id === response.data.data.user_id &&
          this.type === this.convertToUserType(response.data.data.user_type)
      );
  }

  allowedDashboard() {
    return this.isAdmin() || this.isLibrarian() || this.isDistributor();
  }

  getUserType() {
    return this.type;
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

  isUser() {
    return this.isAuthenticated() && this.type === "user";
  }

  convertToUserType(idUserType) {
    if (idUserType === 5) return "admin";
    else if (idUserType === 4) return "librarian";
    else if (idUserType === 3) return "distributor";
    else return "user";
  }
}

export default new AuthService();
