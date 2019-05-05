<template>
  <div id="logreg-forms">
    <!-- <h3>{{obj.title}}</h3> -->
    <form class="form-signin" v-if="isShown">
      <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">Log in</h1>
      <input
        type="email"
        ref="address"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      >
      <input
        type="password"
        ref="pw"
        class="form-control"
        placeholder="Password"
        required
      >
      <button class="btn btn-success btn-block" type="submit" v-on:click.prevent="logIn">
        <i class="fas fa-sign-in-alt"></i> Log in
      </button>
      <button class="btn btn-primary btn-block" type="button" v-on:click.prevent="changeShown">
        <i class="fas fa-user-plus"></i> Sign up New Account
      </button>
    </form>
    <form class="form-signup" v-show="!isShown">
      <input
        type="email"
        ref="email"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      >
      <input
        type="password"
        ref="pw1"
        class="form-control"
        placeholder="Password"
        required
        autofocus
      >
      <input
        type="password"
        ref="pw2"
        class="form-control"
        placeholder="Repeat Password"
        required
        autofocus
      >
      <button class="btn btn-primary btn-block" type="submit" v-on:click.prevent="signUp">
        <i class="fas fa-user-plus"></i> Sign Up
      </button>
      <a href="#" v-on:click.prevent="changeShown">
        <i class="fas fa-angle-left"></i> Back
      </a>
    </form>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "login",
  props: {
    obj: Object,
    doLogin: Function,
    doSignup: Function,
  },
  data() {
    return {
      isShown: true
    };
  },
  methods: {
    changeShown(event) {
      this.isShown = !this.isShown;
    },
    async logIn(event) {
      if(this.$refs.address.value.length <= 0) {
        alert('email address not found');
        return false;
      }
      if(!this.validEmail(this.$refs.address.value)) {
        alert('invalid email address');
        return false;
      }
      if(this.$refs.pw.value.length <= 0) {
        alert('password not found');
        return false;
      }
      await this.doLogin(this.$refs.address.value, this.$refs.pw.value);
    },
    async signUp(event) {
      if(this.$refs.email.value.length <= 0) {
        alert('email address not found');
        return false;
      }
      if(!this.validEmail(this.$refs.email.value)) {
        alert('invalid email address');
        return false;
      }
      if(this.$refs.pw1.value.length <= 0) {
        alert('password not found');
        return false;
      }
      if(this.$refs.pw2.value.length <= 0) {
        alert('repeat password not found');
        return false;
      }
      if (this.$refs.pw1.value !== this.$refs.pw2.value) {
        alert("wrong the repeat password");
        return;
      }
      await this.doSignup(this.$refs.email.value, this.$refs.pw1.value);
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style lang="scss" src="../assets/styles/login.scss"/>