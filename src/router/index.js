import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login')
  },
  {
    path: '/classes',
    name: 'Classes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Classes')
  }
  ,
  {
    path: '/courses',
    name: 'Courses',
    component: () => import( '../views/Courses')
  },
  {
    path: '/add-course',
    name: 'Add_Courses',
    component: () => import( '../views/AddCourse')
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import( '../views/Students')
  },
  {
    path: '/student-panel',
    name: 'Student',
    component: () => import( '../views/StudentCourses')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
