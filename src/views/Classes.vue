<template>
  <div>
    <div class="content_box">
      <div class="left_bar">
        <ul class="nav-tabs--vertical nav" role="navigation">
          <li v-bind:key="x.id" v-for="x in classes" class="nav-item">
            <a
              v-bind:href="`#${x.name}`"
              class="nav-link"
              data-toggle="tab"
              role="tab"
              v-bind:aria-controls="x.name"
              >{{ x.name }}</a
            >
          </li>
        </ul>

        <label class="row justify-content-center">Add New Class</label>
        <button
          @click="isFormShown = !isFormShown"
          class="row btn btn-primary rounded"
        >
          +
        </button>
        <form @submit="classCreate" v-show="isFormShown">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input v-model="className" type="text" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="right_bar">
        <div class="tab-content">
          <div
            class="tab-pane fade"
            v-bind:key="x.id"
            v-for="x in classes"
            v-bind:id="x.name"
            role="tabpanel"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                </tr>
              </thead>
              <tbody v-bind:key="student.id" v-for="student in x.students">
                <tr>
                  <td>{{ student.id }}</td>
                  <td>{{ student.first_name }}</td>
                  <td>{{ student.last_name }}</td>
                </tr>
              </tbody>
            </table>
            <div class="container-fluid">
              <label class="row justify-content-center"
                >Add Students To This Class</label
              >
              <button
                v-on:click="isShow = !isShow"
                class="row btn btn-primary rounded"
              >
                +
              </button>
            </div>
            <div v-show="isShow" class="label label-info">
              <div class="container">
                <div class="list-group">
                  <div
                    v-bind:key="student.id"
                    v-for="student in students"
                    class="form-check"
                  >
                    <label class="form-check-label">
                      <input
                        v-model="selectedStudents"
                        type="checkbox"
                        class="form-check-input"
                        v-bind:value="student.id"
                      />{{ student.first_name }} {{ student.last_name }}
                    </label>
                  </div>
                </div>
                <button @click="saveStudents(x.id)" class="btn btn-success rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getClasses, getStudents, createClass, addStudentsToClass } from "../api";
import Class from "../models/ClassModel";
export default {
  data() {
    return {
      classes: null,
      className: null,
      isShow: false,
      isFormShown: false,
      students: null,
      selectedStudents: [],
    };
  },
  methods: {
    async classCreate() {
      const created = new Class(this.className);
      this.classes = await createClass(created);
    },

    async saveStudents(id) {
      this.classes = await addStudentsToClass(id,this.selectedStudents)
    },
  },
  async created() {
    this.classes = await getClasses();
    this.students = await getStudents();
  },
};
</script>
<style scoped>
.content_box {
  float: left;
  width: 100%;
}
.left_bar {
  float: left;
  width: 15%;
  background: #eaf4ff;
  height: 100vh;
}

.right_bar {
  float: left;
  width: 85%;
  padding: 15px;
  /*border-left:1px solid #ccc;*/
  height: 100%;
}

.nav-tabs--vertical li {
  float: left;
  width: 100%;
  padding: 0;
  position: relative;
}

.nav-tabs--vertical li a {
  float: left;
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #adcff7;
  color: #1276f0;
}

.nav-tabs--vertical li a.active::after {
  content: "";
  border-color: #1276f0;
  border-style: solid;
  position: absolute;
  right: -8px;
  /* border-top: transparent; */
  border-right: transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  /*border-bottom: 16px solid #1276F0;*/
  border-bottom: 16px solid #fff;
  border-top: 0;
  transform: rotate(270deg);
  z-index: 999;
}
</style>