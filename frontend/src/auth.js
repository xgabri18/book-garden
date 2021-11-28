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
          this.authenticated = true;
          this.id = response.data.data.user_id;
          this.type = this.convertToUserType(response.data.data.user_type);

          // Collect user info
          return axios.get(createAPI("person")).then((response) => {
            if (response.data.status === "success") {
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
            } else {
              console.log("Can not get person info.");
              console.log(response.data);
            }
          });
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.log(error));
  }

  logout() {
    return axios
      .delete(
        createAPI("session").then((response) => {
          if (response.data.status === "success") {
            // Logged out
            this.init();
            return <Redirect to="/" />;
          } else {
            // Session is not set ignore
          }
        })
      )
      .catch((error) => console.log(error));
  }

  async checkAuthStatus() {
    const response = await axios.get(createAPI("session"));

    if (response.status === 200) {
      console.log(response.data);
      this.authenticated =
        this.id === response.data.data.user_id &&
        this.type === this.convertToUserType(response.data.data.user_type);
    } else {
      this.authenticated = false;
    }

    // .then((response) => {
    //     this.authenticated =
    //       this.id === response.data.data.user_id &&
    //       this.type === this.convertToUserType(response.data.data.user_type);
    //   })
    //     .catch((error) => console.log(error));

    return this.authenticated;
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

  getUsername() {
    return this.username;
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
