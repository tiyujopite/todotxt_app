<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="login">
        <div class="w-full flex flex-col text-center justify-center">
          <img src="/icon.svg" class="logo w-40 self-center" alt="icon"/>
          <h1 class="text-5xl font-bold">todotxt.app</h1>
        </div>
        <input
        id="email"
        required
        minlength="3"
        type="email"
        autocapitalize="off"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-6"
        :placeholder="$gettext('Email')"
        v-model="email">
        <input
        id="password"
        name="password"
        type="password"
        required
        minlength="8"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('Password')"
        v-model="password">
        <p id="login_error" class="font-semibold text-red-500 mt-1">{{ error }}</p>
        <button
        class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-1"
        :class="error.length > 0 ? 'mt-1' : 'mt-8'"
        type="submit"
        ><translate>Login</translate></button>
      </form>
      <p class="mt-10 text-center text-sm">
        <translate>Don't have an account?</translate>
        <a @click="$router.push('/register')" tabindex="-1"
        class="font-semibold leading-6 hover:text-green-600 cursor-pointer">&nbsp;<translate>Register</translate></a>
      </p>
      <p class="text-center text-sm">
        <a @click="$router.push('/send-email-change-password')" tabindex="-1"
        class="font-semibold leading-6 hover:text-green-600 cursor-pointer"><translate>Forgot your password?</translate></a>
      </p>
    </div>
  </div>
</template>
<script>
import 'vue-loading-overlay/dist/css/index.css'
import Loading from 'vue-loading-overlay'
import { Http } from '../http.js'

export default {
  inject: [],
  components: {
    Loading,
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      overlay: false,
    }
  },
  methods: {
    async login() {
      this.overlay = true
      this.error = ''
      try {
        let response = await Http('POST', '/api/login', {
          'email': this.email,
          'password': this.password
        })
        this.$emit('checkAuthCookie')
        this.overlay = false
        if (response.ok) {
          this.$router.push({name: 'tasks'})
        } else if (response.status === 401 || response.status === 403) {
          this.error = this.$gettext('Wrong username or password')
        } else if (response.status === 400) {
          let data = await response.json()
          this.error = this.$gettext(data.message)
        } else {
          this.error = this.$gettext('An error occurred')
        }
      } catch (error) {
        this.error = this.$gettext('An error occurred')
        this.overlay = false
      }
    },
  },
}
</script>
