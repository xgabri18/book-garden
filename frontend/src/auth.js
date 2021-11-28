import { Redirect } from "react-router-dom";
import axios from "axios";
import qs from "querystring";
import { createAPI } from "./api";

class AuthService {
  constructor() {
    this.init();
  }

  init() {
    // this.authenticated = true;
    // this.id = 1;
    // this.username = "admin";
    // this.type = "admin";
    // this.library_id = null;
    // this.name = "Joe";
    // this.surname = "Doe";
    // this.profiledesc = "I love 50 shades of gray";

    this.authenticated = false;
    this.id = null;
    this.username = "";
    this.type = "";
    this.library_id = null;
    this.name = "";
    this.surname = "";
    this.profiledesc = "";
  }

  login(username, password) {
    // Login
    return axios
      .post(createAPI("session"), qs.stringify({ username, password }))
      .then((response) => {
        if (response.data.status === "success") {
          this.checkAuthSession();
        } else {
          console.log(response.data);
          return false;
        }
      })
      .catch((error) => console.log(error));
  }

  logout() {
    return axios
      .delete(createAPI("session"))
      .then((response) => {
        this.authenticated = false;
        return response.data.status === "success";
      })
      .catch((error) => console.log(error));
  }

  checkAuthSession() {
    return axios.get(createAPI("session")).then((session) => {
      if (
        session.status === 200 &&
        session.data.data.user_id &&
        session.data.data.user_type
      ) {
        console.log(session.data);
        this.id = session.data.data.user_id;
        this.type = this.convertToUserType(session.data.data.user_type);
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }

      console.log("checkAuthSession: " + this.authenticated);
    });
  }

  isAuthenticated() {
    return this.authenticated;
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
