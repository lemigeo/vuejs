<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/transfer">Transfer</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/blocks">Blocks</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav"
}
</script>