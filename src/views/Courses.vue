<template>
  <div class="container-fluid row">
    <div
      v-bind:key="course.id"
      v-for="course in courses"
      class="card col-md-4"
      style="width: 18rem"
    >
      <div class="card-body">
        <h5 class="card-title">{{ course.name }}</h5>
        <p class="card-text">Credit: {{ course.credit }}</p>
        <a href="#" class="card-link">Edit</a>
      </div>
    </div>
    
      <div class="card col-md-4 justify-content-center" style="width: 18rem">
        <router-link to="/add-course" class="card-link">Add New</router-link>
      </div>
  </div>
</template>
<script>
import { getCourses } from "../api";
export default {
  data() {
    return {
      courses: null,
    };
  },
  async created() {
    this.courses = await getCourses();
  },
};
</script>
<style>
</style>