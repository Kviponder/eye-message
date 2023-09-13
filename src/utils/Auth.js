// AuthContext.js
import decode from "jwt-decode";

class Auth {
  getToken() {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem("tokenID");
    console.log("Token retrieved from local storage:", token);
    return token;
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  login(token) {
    // Saves user token to localStorage
    localStorage.setItem("tokenID", token);
  }

  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("tokenID");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

const authInstance = new Auth();

export default authInstance;
