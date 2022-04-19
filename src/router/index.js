import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Home.vue'),
      meta: {
        requiresAuth: true,
        pageTitle: 'Dashboard',
        breadcrumb: [{
          text: 'Dashboard',
          active: true,
        }, ],
      },
    },
    {
      path: '/AgendaDomiciliaria',
      name: '/AgendaDomiciliaria',
      component: () => import('@/views/MiAgenda.vue'),
      meta: {
        pageTitle: 'Mi Agenda',
        breadcrumb: [{
          text: 'Mi Agenda',
          active: true,
        }, ],
      },
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login | Home Health Care',
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '**',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      console.log(store.state)
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router