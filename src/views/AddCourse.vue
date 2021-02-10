<template >
  <div class="col-md-4 mr-auto ml-auto py-5">
    <form @submit="addCourse">
      <div class="form-group">
        <label>Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Enter course name"
        />
      </div>
      <div class="form-group">
        <label>Credit</label>
        <input
          v-model="credit"
          type="number"
          class="form-control"
          placeholder="Credit"
        />
      </div>
      <div class="row form-group form-check">
        <label class="float-left">Is Essential?</label>
        <input
          v-model="is_essential"
          type="checkbox"
          class="form-check-input"
          true-value="true"
          false-value="false"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-5">Submit</button>
    </form>
  </div>
</template>
<script>
import { createCourse } from "../api";
import  Course  from "../models/CourseModel";
export default {
  name: "add-course",
  data() {
    return {
      is_essential: false,
      credit: null,
      name: null,
    };
  },
  methods: {
    async addCourse() {
      const course = new Course(this.name,this.credit,this.is_essential);
      console.log(course)
      await createCourse(course);
      this.$router.push('/courses');
    },
  },
};
</script>
<style >
</style>