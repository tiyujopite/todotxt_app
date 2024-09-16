<template>
  <div id="app-child" class="w-full flex flex-no-wrap">
    <div
    id="desktop-nav"
    style="min-height: 716px"
    class="w-64 absolute sm:relative md:h-full flex-col justify-between hidden sm:flex">
      <div class="px-5">
        <div class="h-16 w-full flex flex-col text-center justify-center">
          <img src="/icon.svg" class="logo w-20 h-20 self-center mt-10" alt="icon"/>
          <p class="text-2xl font-bold">todotxt.app</p>
        </div>
        <ul class="mt-12">
          <span
          v-for="item in menu">
            <li
            class="flex w-full justify-between items-center pt-2 pb-2 mb-2 rounded-xl px-3 duration-150 cursor-pointer accent-color-hover hover:scale-110"
            v-if="(item.authenticated === true && authenticated) || (item.authenticated === false && !authenticated) || item.authenticated === undefined"
            :class="item.arg === $route.path ? 'accent-color scale-110' : ''"
            @click="item.click(item.arg)">
              <div class="flex items-center">
                <i :class="item.class"></i>
                <translate class="ml-2">{{ item.name }}</translate>
              </div>
            </li>
          </span>
          <ThemeButton/>
          <LangSwitcher/>
        </ul>
      </div>
    </div>
    <div
    id="mobile-nav"
    style="transform: translateX(-260px);"
    class="w-64 z-40 absolute md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out bg-secondary rounded-br-xl shadow-2xl">
      <button
      id="openSideBar"
      class="h-9 w-10 absolute right-0 mt-5 -mr-10 flex items-center rounded-r-xl justify-center cursor-pointer bg-green-600 font-semibold"
      aria-label="Open sidebar"
      @click="sidebarHandler(true)">
        <i class="bi bi-list"></i>
      </button>
      <button
      id="closeSideBar"
      class="hidden h-9 w-10 absolute right-0 mt-5 -mr-10 items-center rounded-r-xl justify-center cursor-pointer bg-green-600 font-semibold"
      aria-label="Close sidebar"
      @click="sidebarHandler(false)">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="px-5">
        <div class="h-16 w-full flex flex-col text-center justify-center">
          <img src="/icon.svg" class="logo w-20 h-20 self-center mt-10" alt="icon"/>
          <p class="text-2xl font-bold">todotxt.app</p>
        </div>
      </div>
      <div class="px-6">
        <ul class="mt-10">
          <span
          v-for="item in menu">
            <li
            class="flex w-full justify-between items-center pt-2 pb-2 mb-2 rounded-xl px-3 duration-300 cursor-pointer accent-color-hover hover:scale-110"
            v-if="(item.authenticated === true && authenticated) || (item.authenticated === false && !authenticated) || item.authenticated === undefined"
            :class="item.arg === $route.path ? 'accent-color scale-110' : ''"
            @click="item.click(item.arg);sidebarHandler(false)">
              <div class="flex items-center">
                <i :class="item.class"></i>
                <translate class="ml-2">{{ item.name }}</translate>
              </div>
            </li>
          </span>
          <ThemeButton/>
          <LangSwitcher/>
        </ul>
      </div>
    </div>
    <div class="mx-0 sm:mx-auto py-3 sm:py-10 px-2 h-full w-full sm:w-11/12">
      <RouterView @checkAuthCookie="checkAuthCookie"/>
    </div>
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import { Http } from './http.js'
import LangSwitcher from './components/LangSwitcher.vue'
import ThemeButton from './components/ThemeButton.vue'

export default {
  inject: [],
  components: {
    LangSwitcher,
    ThemeButton,
  },
  data() {
    return {
      menu: [
        {
          name: this.$gettext('Home'),
          class: 'bi bi-house-door-fill',
          click: this.$router.push,
          arg: '/',
          authenticated: undefined,
        },
        {
          name: this.$gettext('Tasks'),
          class: 'bi bi-list-task',
          click: this.$router.push,
          arg: '/tasks',
          authenticated: true,
        },
        {
          name: this.$gettext('Export'),
          class: 'bi bi-file-earmark-arrow-down-fill',
          click: this.$router.push,
          arg: '/export',
          authenticated: true,
        },
        {
          name: this.$gettext('Import'),
          class: 'bi bi-file-earmark-arrow-up-fill',
          click: this.$router.push,
          arg: '/import',
          authenticated: true,
        },
        {
          name: this.$gettext('Login'),
          class: 'bi bi-person-fill',
          click: this.$router.push,
          arg: '/login',
          authenticated: false,
        },
        {
          name: this.$gettext('Register'),
          class: 'bi bi-person-fill-add',
          click: this.$router.push,
          arg: '/register',
          authenticated: false,
        },
        {
          name: this.$gettext('Logout'),
          class: 'bi bi-door-closed-fill',
          click: this.logout,
          arg: null,
          authenticated: true,
        },
        {
          name: this.$gettext('Change password'),
          class: 'bi bi-key-fill',
          click: this.$router.push,
          arg: '/send-email-change-password',
          authenticated: true,
        },
      ],
      overlay: false,
      authenticated: document.cookie.includes('authenticated=true')
    }
  },
  methods: {
    sidebarHandler(flag) {
      if (flag) {
        document.getElementById("mobile-nav").style.transform = "translateX(0px)"
        document.getElementById("openSideBar").classList.add("hidden")
        document.getElementById("closeSideBar").classList.remove("hidden")
      } else {
        document.getElementById("mobile-nav").style.transform = "translateX(-260px)"
        document.getElementById("closeSideBar").classList.add("hidden")
        document.getElementById("openSideBar").classList.remove("hidden")
      }
    },
    async logout() {
      try {
        await Http('POST', '/api/logout')
        this.checkAuthCookie()
        this.$router.push({name: 'login'})
      } catch (error) {
        console.error(error)
      }
    },
    checkAuthCookie() {
      this.authenticated = document.cookie.includes('authenticated=true')
    },
  },
}
</script>
