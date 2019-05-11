<template>
  <div class="container">
    <Nav />
    <form>
      <div class="card p-2">  
        <div class="input-group">
          <input type="password" ref="pw" class="form-control" placeholder="Password" required autofocus />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit" v-on:click.prevent="createAccount"> Create a new account </button>
          </div>
        </div>
      </div>
    </form>
    <div class="card">
      <ul v-for="account in accounts" :key="account.idx">
        <li class="list">
          <div class="content">
            <img src="https://etherscan.io/images/svg/brands/ethereum-1.svg?v=1.3">
            <div class="label">
              <div class="title"> Address </div>
              <div class="address"> {{account.address}} </div>
            </div>
          </div>
          <div class="buttons">
            <button class="btn btn-info" v-on:click.prevent="searchAccount(account.idx)">Search</button>
            <button class="btn btn-danger" v-on:click.prevent="deleteAccount(account.idx)">Delete</button>
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
  data() {
    return{
      accounts: [],
    }
  },
  components: {
    Nav
  },
  async mounted() {
    if(!api.loggedIn()) {
      this.$router.push({name: 'index'});
    }
    await this.getAccounts();
  },
  computed: {
    ...mapState([
      'session',
    ]),
  },
  methods: {
    async getAccounts() {
      this.accounts = await api.getAccounts();
    },
    async createAccount(event) {
      if(this.$refs.pw.value.length <= 0) {
        alert('password not found');
        return false;
      }
      let resp = await api.createAccount(this.$refs.pw.value);
      if(resp !== null) {
        this.accounts.push(resp.account);
      }
      else {
        alert('failed to create a new account');
      }
    },
    async searchAccount(idx) {
      alert(idx);
    },
    async deleteAccount(idx) {
      alert(idx);
    },
  }
};
</script>

<style lang="scss" src="../assets/styles/home.scss"/>