import axios from "axios";

const url = "https://book-garden.herokuapp.com/api/";

export const createAPI = (name, params = {}) => {
  for (let key in params) {
    name = name.replace(`:${key}`, params[key]);
  }

  return url + name;
};

export const getLibrary = (id) => {
  return axios
    .get(createAPI("library/:id", { id }))
    .then((response) => response.data.data)
    .catch((error) => console.log(error));
};
