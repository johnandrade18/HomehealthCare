/*eslint-disable */
<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo brand-logo-inicio flex-display">
        <vuexy-logo />
        <h2 class="brand-text text-tittle pt-2">Home Healt Care</h2>
      </b-link>
      <!-- /Brand logo-->
      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-0 bg-inicio">
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Bienvenido!
          </b-card-title>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- user -->
              <b-form-group label="Usuario" label-for="login-user">
                <validation-provider
                  #default="{ errors }"
                  name="user"
                  rules="required"
                >
                  <b-form-input
                    id="login-user"
                    v-model="user"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    name="login-user"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary mt-2"
                block
                @click="login"
              >
                Sign in
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardTitle,
  BForm,
  BButton,
} from 'bootstrap-vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import auth from "@auth/login"
import { mapActions } from 'vuex'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  props: {
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      password: '',
      user: '',
      status: '',
      sideImg: require('@/assets/images/bg/inicio.png'),
      required,
      passwordFieldType: 'password',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg');
        return this.sideImg
      }
      return this.sideImg
    },
  },
  created() {
    document.title = 'Login - Home Healt Care'
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Ingreso Correcto',
              icon: 'EditIcon',
              variant: 'success',
              text: 'Bienvenido al sistema',
            },
          })
        }
      })
    },
    async login(){
      try {
        await auth.login(this.user, this.password).then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Ingreso Correcto",
              icon: "EditIcon",
              variant: "success",
              text: "Bienvenido al sistema",
            },
          });
          localStorage.setItem("token", response.data.access_token);
          this.$store.dispatch('isLogin')
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
    ...mapActions(['isLogin']),
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
