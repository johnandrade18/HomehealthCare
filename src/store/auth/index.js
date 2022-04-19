import Vue from "vue";
import Vuex from "vuex";
import auth from "@auth/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
  },
  mutations: {
    setLoggedIn(state) {
      state.loggedIn = true;
    },
    logout(){
        localStorage.removeItem('token');
        this.$router.push('/');
    }
  },
  actions: {
    isLogin({ commit }, user) {
      try {
        auth.login(user).then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Ingreso Correcto",
              icon: "EditIcon",
              variant: "success",
              text: "Bienvenido al sistema",
            },
          });
          commit("setLoggedIn");
          localStorage.setItem("token", response.data.access_token);
          this.$router.push("/dashboard");
        });
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: "Error de ingreso",
            icon: "AlertCircleIcon",
            variant: "danger",
            text: "Credenciales incorrectas",
          },
        });
      }
    },
    getToken({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
      } else {
        commit("setToken", null);
      }
    },
    logout ({ commit }) {
        commit('logout')
      },
  },
});
