import axios from "axios";

export default {
  addPoint: function(house, user) {
    return axios.post("/api/add", { house: house, user: user });
  },
  subtractPoint: function(house, user) {
    return axios.post("/api/subtract", { house: house, user: user });
  },
  getPoints: function() {
    return axios.get("/api/get");
  },
  authenticateUser: function(user, password) {
    return axios.post("/api/auth", { user: user, password: password });
  },
  validate: function(token, user) {
    return axios.post("/api/validate", { token: token, user: user });
  }
};
