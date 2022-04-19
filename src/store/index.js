import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
  },
  mutations: {
    loggedIn(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  actions: {
    isLogin(context) {
      setTimeout(() => {
        context.commit('loggedIn');
      }, 1000);
    },
    getToken({
      commit
    }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
      } else {
        commit("setToken", null);
      }
    },
    logout({
      commit
    }) {
      commit('logout')
    },
  },
  modules: {
    app,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
})