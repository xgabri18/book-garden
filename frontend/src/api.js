const url = "http://book-garden.herokuapp.com/api/";

export const createAPI = (name, params = {}) => {
  for (let key in params) {
    name = name.replace(`:${key}`, params[key]);
  }

  return url + name;
};
