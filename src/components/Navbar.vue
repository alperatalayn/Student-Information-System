<template>
  <nav :key="user" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">XUNIVERSITY</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul v-if="user" class="navbar-nav">
        <li v-if="user.is_instructor" class="nav-item active">
          <router-link class="nav-link" to="/classes">Classes</router-link>
        </li>
        <li v-if="user.is_instructor" class="nav-item active">
          <router-link class="nav-link" to="/courses">Courses</router-link>
        </li>
        <li v-if="user.is_instructor" class="nav-item active">
          <router-link class="nav-link" to="/students">Students</router-link>
        </li>
        <li v-if="user.is_student" class="nav-item">
          <router-link class="nav-link" to="/student-panel">Manage Courses</router-link>
        </li>
      </ul>
      <ul v-else class="ml-auto justify-content-right navbar-nav">
        <li class="ml-auto nav-item">
          <router-link class="nav-link active" to="/login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

import { mapState } from 'vuex';
export default {
  name: "navbar",
  computed: mapState(['user']),
};
</script>
<style scoped>
.nav.navbar-nav.navbar-right li a {
  color: #fff;
}
</style>