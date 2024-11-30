<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="register">
        <div class="w-full flex flex-col text-center justify-center">
          <img src="/icon.svg" class="logo w-40 self-center" alt="icon"/>
          <h1 class="text-5xl font-bold">todotxt.app</h1>
        </div>
        <p
        class="text-lg mt-2"
        v-if="success"
        ><translate>confirm_email_text</translate></p>
        <input
        id="email"
        type="email"
        required
        autocapitalize="off"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('Email')"
        v-if="!success"
        v-model="email">
        <input
        id="email2"
        type="email"
        required
        autocapitalize="off"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('Repeat email')"
        v-if="!success"
        v-model="email2">
        <input
        id="password"
        name="password"
        type="password"
        required
        minlength="8"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('Password')"
        v-if="!success"
        v-model="password">
        <input
        id="password2"
        name="password2"
        type="password"
        required
        minlength="8"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('Repeat password')"
        v-if="!success"
        v-model="password2">
        <div
        class="flex items-center mt-2"
        v-if="!success">
          <input
          id="terms"
          type="checkbox"
          class="w-5 h-5 cursor-pointer flex"
          v-model="accept_terms"/>
          <label for="terms" class="py-1 px-2 font-semibold">
          <translate>I accept</translate>&nbsp;
          <a @click="$router.push('/terms_and_conditions')" tabindex="-1" class="font-semibold leading-6 text-green-600 cursor-pointer">
            <translate>terms and conditions</translate>
          </a>
          </label>
        </div>
        <p id="register_error" class="font-semibold text-red-500 mt-1">{{ error }}</p>
        <button
        type="submit"
        v-if="!success"
        class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-1"
        :class="error.length > 0 ? 'mt-1' : 'mt-8'"
        ><translate>Register</translate></button>
      </form>
      <p
        class="mt-10 text-center text-sm"
        v-if="!success"
        >
        <translate>Already have an account?</translate>
        <a @click="$router.push('/login')" tabindex="-1"
        class="font-semibold leading-6 hover:text-green-600 cursor-pointer">&nbsp;<translate>Login</translate></a>
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
      email2: '',
      password: '',
      password2: '',
      accept_terms: false,
      error: '',
      success: false,
      overlay: false,
    }
  },
  methods: {
    checkForm() {
      if (this.email != this.email2) {
        this.error = this.$gettext('Emails do not match')
      } else if (this.password != this.password2) {
        this.error = this.$gettext('Passwords do not match')
      } else if (!this.accept_terms) {
        this.error = this.$gettext('You must accept the terms and conditions')
      }
    },
    async register() {
      this.error = ''
      this.checkForm()
      if (this.error || this.success) return

      this.overlay = true
      try {
        let response = await Http('POST', '/api/register', {
          'email': this.email,
          'password': this.password,
          'lang': localStorage.getItem('user-lang') || 'en'
        })
        this.$emit('checkAuthCookie')
        this.overlay = false
        if (response.ok) {
          this.success = true
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
