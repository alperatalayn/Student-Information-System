import { createStore } from 'vuex'
export default createStore({
  state(){
    return{
      user : null 
      }
  },
  mutations: {
    setUser(state,data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
