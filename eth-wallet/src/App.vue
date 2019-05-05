<template>
  <div id="app">
    <div class="container">
      <router-link to="/Home">
      <div class="py-1 text-center">
        {{ title }}
        <img
          class="d-block mx-auto mb-4"
          width="72"
          height="72"
          alt="Vue Logo"
          src="./assets/logo.png"
        >
      </div>
      </router-link>
      <router-view></router-view>
    </div>
    <!-- <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "VueJS"
    }
  },
  components: {
  }
};
</script>

<style lang="scss" src="./assets/styles/app.scss"/>