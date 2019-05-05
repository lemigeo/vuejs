<template>
  <div class="text-center" data-gr-c-s-loaded="true">
    <Login :obj="content" :doLogin="doLogin" :doSignup="doSignup" />
  </div>
</template>

<script>
import api from  '../api';
import Login from '../components/Login.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: "index",
  components: {
    Login
  },
  data() {
    return {
      content: {
        title: "name on it"
      }
    };
  },
  mounted: function() {
    if(api.loggedIn()) {
      this.$router.push({name: 'home'});
    }
  },
  computed: {
    ...mapState([
      'session',
    ]),
  },
  methods: {
    ...mapActions({
      update: 'session/updateSession',
      clear: 'session/clearSession'}),
    async doLogin(email, pw) {
      let resp = await api.logIn(email, pw);
      if(resp !== null) {
        if(!resp.confirm) {
          this.$router.push({name: 'confirm'});
        }
        else {
          this.update({
            logined: true,
            email: resp.email,
          });
          this.$router.push({name: 'home'});
        }
      }
    },
    async doSignup(email, pw) {
      let result = await api.signUp(email, pw);
      if(result){
        this.$router.push({name: 'confirm'});
      }
      else{
        alert('failed to sign up');
        return false;
      }
    }
  }
};
</script>