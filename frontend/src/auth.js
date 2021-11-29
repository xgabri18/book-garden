import axios from "axios";
import qs from "querystring";
import { createAPI } from "./api";

class AuthService {
  constructor() {
    this.init();
  }

  /**
   * Hold User Information
   */
  init() {
    this.authenticated = false;
    this.id = null;
    this.username = "";
    this.password = "";
    this.email = "";
    this.type = "";
    this.library_id = null;
    this.name = "";
    this.surname = "";
    this.profiledesc = "";
  }

  /**
   * Register User
   *
   * @param data
   *
   * @return {Promise<unknown>}
   */
  register(data) {
    return axios
      .post(createAPI("person"), qs.stringify({ ...data }))
      .then((response) => response.data);
  }

  /**
   * Login User
   *
   * @param username
   * @param password
   *
   * @return {Promise<unknown | void>}
   */
  login(username, password) {
    return axios
      .post(createAPI("session"), qs.stringify({ username, password }))
      .then((response) => {
        this.authenticated = true;
        return response.data;
      })
      .catch((error) => console.log(error));
  }

  /**
   * Logout User
   *
   * @return {Promise<boolean | void>}
   */
  logout() {
    return axios
      .delete(createAPI("session"))
      .then((response) => {
        this.authenticated = false;
        return response.data.status === "success";
      })
      .catch((error) => console.log(error));
  }

  /**
   * Script for checking Auth Session
   *
   * @return {Promise<AxiosResponse<unknown>>}
   */
  checkAuthSession() {
    return axios.get(createAPI("session")).then((session) => {
      if (
        session.status === 200 &&
        session.data.data.user_id &&
        session.data.data.user_type
      ) {
        this.authenticated = true;
        this.id = session.data.data.user_id;
        this.type = this.convertToUserType(session.data.data.user_type);

        return axios
          .get(createAPI("person/:id", { id: this.id }))
          .then((response) => {
            if (response.data.status === "success") {
              this.username = response.data.data.username;
              this.password = response.data.data.password;
              this.email = response.data.data.email;
              this.library_id = response.data.data.library_id;
              this.name = response.data.data.name;
              this.surname = response.data.data.surname;
              this.profiledesc = response.data.data.profiledesc;

              console.log("checkAuthSession: " + this.authenticated);
              return true;
            } else {
              console.log("Can not get user info");
            }
          });
      } else {
        this.authenticated = false;
        console.log("checkAuthSession: " + this.authenticated);
        return false;
      }
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

  getEmployeeLibrary() {
    return this.library_id;
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
