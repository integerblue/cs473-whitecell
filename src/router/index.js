import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Lobby from '@/views/Lobby.vue'
import Room from '@/views/Room.vue'

import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/lobby'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (firebase.auth().currentUser !== null) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lobby/:id',
    name: 'Room',
    component: Room,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    currentUser == null
  ) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
