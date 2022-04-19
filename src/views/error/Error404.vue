/* eslint-disable vue/singleline-html-element-content-newline */
<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <vuexy-logo />
      <h2 class="brand-text pt-2">Home Health Care</h2>
    </b-link>

    <div class="bg-error-404">
      <div class="text-error-404">
        <div class="w-100 text-center mx-2">
          <h2 class="mb-1 text-dark-404">Pagina No Encontrada!</h2>
          <p class="mb-2 text-dark-404">
            Oops! La dirección URL solicitada no se encontró en este servidor.
          </p>

          <b-button
            id="btn-back"
            variant="primary"
            class="mb-2 btn-sm-block"
          >
            Regresar al Inicio
          </b-button>
        </div>
      </div>
    </div>
  </div>
  <!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton } from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import store from "@/store/index";

export default {
  components: {
    VuexyLogo,
    BLink,
    BButton,
  },
  data() {
    return {
      downImg: require("@/assets/images/pages/error.svg"),
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require("@/assets/images/pages/error-dark.svg");
        return this.downImg;
      }
      return this.downImg;
    },
  },
  mounted() {
    const boton = document.querySelector("#btn-back");
    boton.addEventListener(
      "click",
      function () {
        window.history.back();
      },
      false
    );
  },
};
</script>

<style lang='scss'>
@import "@core/scss/vue/pages/page-misc.scss";
</style>
