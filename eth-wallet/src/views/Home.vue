<template>
  <div class="container">
    <Nav />
    <form>
      <div class="card p-2">  
        <div class="input-group">
          <input type="password" ref="pw" class="form-control" placeholder="Password" required autofocus />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit" v-on:click.prevent="create"> Create a new account </button>
          </div>
        </div>
      </div>
    </form>
    <div class="card">
      <ul>
        <li class="list">
          <div class="content">
            <img src="https://etherscan.io/images/svg/brands/ethereum-1.svg?v=1.3">
            <div class="label">
              <div class="title"> Address </div>
              <div class="address">0xbe06cd7dc23325287439516ca2d1ad98ec4c2419</div>
            </div>
          </div>
          <div class="buttons">
            <button class="btn btn-info">Search</button>
            <button class="btn btn-danger">Delete</button>
          </div>
        </li>
        <li class="list">
          <div class="content">
            <img src="https://etherscan.io/images/svg/brands/ethereum-1.svg?v=1.3">
            <div class="label">
              <div class="title"> Address </div>
              <div class="address">0xbe06cd7dc23325287439516ca2d1ad98ec4c2419</div>
            </div>
          </div>
          <div class="buttons">
            <button class="btn btn-info">Search</button>
            <button class="btn btn-danger">Delete</button>
          </div>
        </li>
      </ul>    
    </div>
  </div>
</template>

<script>
import api from  '../api';
import Nav from '../components/Nav.vue'
import { mapState, mapActions } from 'vuex';

export default {
  name: "home",
  data: {
  },
  components: {
    Nav
  },
  mounted: function() {
    if(!api.loggedIn()) {
      this.$router.push({name: 'index'});
    }
  },
  computed: {
    ...mapState([
      'session',
    ]),
  },
  methods: {
    async create(event) {
      if(this.$refs.pw.value.length <= 0) {
        alert('password not found');
        return false;
      }
      let resp = await api.createAccount(this.$refs.pw.value);
      // if(resp !== null) {
      //   if(!resp.success) {
      //     alert('');
      //   }
      //   else {
      //     alert('');
      //   }
      // }
    },
  }
};
</script>

<style lang="scss" src="../assets/styles/home.scss"/>