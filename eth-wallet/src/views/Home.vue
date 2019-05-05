<template>
  <div class="container">
    <Nav />
    <div class="top">
      <div class="container">
        <button class="button"> Add </button>
      </div>
    </div>
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
import Nav from '../components/Nav.vue'

export default {
  name: "home",
  data: {
  },
  components: {
    Nav
  }
};
</script>

<style lang="scss" src="../assets/styles/home.scss"/>