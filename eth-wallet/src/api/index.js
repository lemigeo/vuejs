import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'

Vue.use(VueCookies);
VueCookies.config('1h');

const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: { 'Access-Control-Allow-Origin': '*' },
  contentType: 'application/json',
});

const api = {
  async signUp(email, pw) {
    try {
      let res = await http.post('signup', { email: email, pw: pw });
      console.log(res.data);
      return res.data.success;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  },
  async logIn(email, pw) {
    try{
      let res = await http.post('login', { email: email, pw: pw });
      if(res.data.result.confirm) {
        $cookies.set('token',res.data.result.token);
      }
      return res.data.result;
    }
    catch(err) {
      console.log(err);
      return null;
    }
  },
  async createAccount(pw) {
    try {
      let res = await http.post('wallet/create', { token: this.getToken(), pw: pw });
      console.log(res);
    }
    catch(err) {
      console.log(err);
      return null;
    }
  },
  getToken() {
    return $cookies.get('token');
  },

  logout(cb) {
    $cookies.remove('token');
    if (cb) cb()
  },

  loggedIn () {
    return !!$cookies.get('token');
  },
}

export default api;