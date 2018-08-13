import axios from "axios";

export default {
  addPoint: function(house) {
    return axios.post("/api/add", { house: house });
  },
  subtractPoint: function(house) {
    return axios.post("/api/subtract", { house: house });
  },
  getPoints: function() {
    return axios.get("/api/get");
  },
  comparePassword: function(password) {
    return axios.post("/api/pwd", { password: password });
  }
};
