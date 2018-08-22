import axios from "axios";

export default {
  addPoint: function(house, user, token) {
    return axios.post("/api/add", { house: house, user: user, token: token });
  },
  subtractPoint: function(house, user, token) {
    return axios.post("/api/subtract", { house: house, user: user, token: token });
  },
  getPoints: function() {
    return axios.get("/api/get");
  },
  authenticateUser: function(user, password) {
    return axios.post("/api/auth", { user: user, password: password });
  },
  validate: function(token, user) {
    return axios.post("/api/validate", { token: token, user: user });
  },
  postChallenge: function(challenge, user, token) {
    return axios.post("/api/challenge", { challenge: challenge, user: user, token: token });
  },
  getChallenges: function() {
    return axios.get("/api/getchallenges");
  }
};
