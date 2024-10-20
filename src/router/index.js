import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import TermsAndConditions from '../components/TermsAndConditions.vue'
import Tasks from '../components/Tasks.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Export from '../components/Export.vue'
import Import from '../components/Import.vue'
import ConfirmEmail from '../components/ConfirmEmail.vue'
import SendChangePassword from '../components/SendChangePassword.vue'
import ChangePassword from '../components/ChangePassword.vue'
import Changelog from '../components/Changelog.vue'

function isAuthenticated() {return document.cookie.includes('authenticated=true')}

function authRequired(to, from, next) {
  if(isAuthenticated())
    next()
  else
    next('/login')
}

function authRejected(to, from, next) {
  if(isAuthenticated())
    next('/tasks')
  else
    next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/terms_and_conditions',
      name: 'terms_and_conditions',
      component: TermsAndConditions
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: authRejected
    },
    {
      path: '/confirm-email',
      name: 'confirm-email',
      props: true,
      component: ConfirmEmail,
      beforeEnter: authRejected
    },
    {
      path: '/send-email-change-password',
      name: 'send-email-change-password',
      component: SendChangePassword,
    },
    {
      path: '/change-password',
      name: 'change-password',
      props: true,
      component: ChangePassword,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: authRejected
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      beforeEnter: authRequired
    },
    {
      path: '/export',
      name: 'export',
      component: Export,
      beforeEnter: authRequired
    },
    {
      path: '/import',
      name: 'import',
      component: Import,
      beforeEnter: authRequired
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: Changelog,
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
})

export default router
