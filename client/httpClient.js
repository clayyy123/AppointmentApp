import axios from 'axios';
const httpClient = axios.create();

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
  return this({ method: 'post', url: '/users', data: userInfo }).then(
    serverResponse => {
      const token = serverResponse.data.token;
      if (token) {
        // sets token as an included header for all subsequent api requests
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
      } else {
        return false;
      }
    }
  );
};

export default httpClient;
