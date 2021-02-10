<template>
  <div v-if="loaded">
      
    <div><h3>Total Credits Taken: {{total}}</h3> <button @click="save" class="btn btn-primary btn-sm mb-2">Save</button></div>
    <div class="container ml-auto row">
      <div class="col-md-5">
        <ul class="list-group">
          <li v-for="course in remaining" :key="course" class="list-group-item">
            <div class="row">
              <div class="container col-8">
                <div>{{ courses.find((x) => x.id === course).name }}</div>
                <div>
                  credit: {{ courses.find((x) => x.id === course).credit }}
                </div>
              </div>
              <div class="col-4">
                <button @click="take(course)" class="btn btn-xs btn-success">
                  +
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-md-5">
        <ul class="list-group">
          <li v-for="course in taken" :key="course" class="list-group-item">
            <div class="row">
              <div class="container col-8">
                <div>{{ courses.find((x) => x.id === course).name }}</div>
                <div>
                  credit: {{ courses.find((x) => x.id === course).credit }}
                </div>
              </div>
              <div class="col-4">
                <button @click="remove(course)" class="btn btn-xs btn-danger">
                  -
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { choose, getCourses, getStudent } from "../api";
import bootbox from "bootbox"
export default {
  data() {
    return {
      user: null,
      courses: null,
      student: null,
      taken: [],
      remaining: [],
      total: null,
      loaded: false,
    };
  },
  methods: {
    onlyInFirst(first, second) {
      const newArr = [];
      for (let i = 0; i < first.length; i += 1) {
        if (second.indexOf(first[i]) === -1) {
          newArr.push(first[i]);
        }
      }
      return newArr;
    },
    arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele != value;
      });
    },
    take(id) {
      this.remaining = this.arrayRemove(this.remaining, id);
      this.taken.push(id);
      this.total = this.creditSum(this.taken)
    },
    remove(id) {
      this.taken = this.arrayRemove(this.taken, id);
      this.remaining.push(id);
      this.total = this.creditSum(this.taken)
    },
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
    async save(){
        if(this.total < 10){
            bootbox.alert("Please choose more courses")
        }
        else if(this.total > 20){
            bootbox.alert("Please choose less courses")
        }else{
            await choose(this.student.id,this.taken)
            bootbox.alert("Success!")
        } 
    }
  },
  async created() {
    this.user = this.$store.state.user;
    this.courses = await getCourses();
    this.student = await getStudent(this.user.id);
    this.taken = Object.values(this.student.courselist);
    let course_ids = [];
    for (let i = 0; i < this.courses.length; i += 1) {
      course_ids.push(Number(this.courses[i].id));
    }
    this.remaining = this.onlyInFirst(course_ids, this.taken);
    this.total = this.creditSum(this.taken)
    this.loaded = true;
  },
};
</script>
<style>
</style>