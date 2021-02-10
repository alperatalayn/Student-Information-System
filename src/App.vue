
<template>
  <div id="nav">
    <Navbar/>
  </div>
  <router-view/>
</template>
<script>
import Navbar from  "./components/Navbar"
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { getUserInfo } from './api'
export default {
  data(){
    return{
    }
  },
  components:{
    Navbar
  },
  async created(){
    this.$store.commit("setUser",await getUserInfo())
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
