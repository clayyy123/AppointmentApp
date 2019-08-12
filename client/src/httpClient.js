import axios from 'axios';
import jwtDecode from 'jwt-decode';
const httpClient = axios.create();

httpClient.getToken = function() {
  return localStorage.getItem('token');
};

httpClient.setToken = function(token) {
  localStorage.setItem('token', token);
  return token;
};

httpClient.getCurrentUser = function() {
  const token = this.getToken();
  if (token) return jwtDecode(token);
  return null;
};

httpClient.logIn = function(credentials) {
  return this({
    method: 'post',
    url: '/users',
    data: credentials
  }).then(serverResponse => {
    const token = serverResponse.data.token;
    if (token) {
      // sets token as an included header for all subsequent api requests
      this.defaults.headers.common.token = this.setToken(token);
      return jwtDecode(token);
    } else {
      return false;
    }
  });
};

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function(userInfo) {
  return this({ method: 'post', url: '/users/new', data: userInfo }).then(
    serverResponse => {
      console.log(serverResponse);
      const token = serverResponse.data.token;
      if (token) {
        // sets token as an included header for all subsequent api requests
        this.defaults.headers.common.token = this.setToken(token);
        return { token: jwtDecode(token), response: serverResponse.data };
      } else {
        return { response: { sucess: false } };
      }
    }
  );
};

httpClient.logOut = function() {
  localStorage.removeItem('token');
  delete this.defaults.headers.common.token;
  return true;
};

export default httpClient;
