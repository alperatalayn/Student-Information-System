<template>
  <div v-if="loaded">
    <div class="tab-content">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Courses Taken</th>
            <th>Total Credit</th>
          </tr>
        </thead>
        <tbody v-bind:key="student.id" v-for="student in students">
          <tr>
            <td class="text-center" >{{ student.id }}</td>
            <td class="text-center" >{{ student.first_name }}</td>
            <td class="text-center" >{{ student.last_name }}</td>
            <td class="text-center" >
              <div :key="course" v-for="course in student.courselist">
                {{ courses.find((x) => x.id === course).name }}
              </div>
            </td>
            <td>
              <div>
                {{ creditSum(student.courselist)}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { getCourses, getStudents } from "../api";
export default {
  data() {
    return {
      students: null,
      courses: null,
      loaded: false,
    };
  },
  methods: {
    creditSum(courselist) {
      var sum = 0;
      if (courselist.length > 0) {
        for (let i =0;i < courselist.length ; i++) {
          sum = sum + this.courses.find((x) => x.id === courselist[i]).credit;
          console.log(sum);
        }
      }
      return sum;
    },
  },
  async created() {
    this.students = await getStudents();
    this.courses = await getCourses();
    console.log(this.students, this.courses);
    this.loaded=true
  },
};
</script>
<style>
</style>