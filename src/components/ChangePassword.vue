<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-3xl font-semibold"><translate>Change password</translate></h1>
      <h1 class="text-xl text-red-500" v-if="error"><translate>change_password_error</translate></h1>
      <form @submit.prevent="changePassword">
        <input
        id="password"
        name="password"
        type="password"
        required
        minlength="8"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('New password')"
        v-model="password">
        <input
        id="password2"
        name="password2"
        type="password"
        required
        minlength="8"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-2"
        :placeholder="$gettext('Repeat new password')"
        v-model="password2">
        <p id="error" class="font-semibold text-red-500 mt-1">{{ error }}</p>
        <button
        class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-1"
        :class="error.length > 0 ? 'mt-1' : 'mt-8'"
        type="submit"
        ><translate>Change</translate></button>
      </form>
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
      token: '',
      email: '',
      error: '',
      password: '',
      password2: '',
      overlay: false,
    }
  },
  methods: {
    checkForm() {
      if (this.password != this.password2) {
        this.error = this.$gettext('Passwords do not match')
      }
    },
    async changePassword() {
      this.error = ''
      this.checkForm()
      if (this.error) return

      this.overlay = true
      try {
        let response = await Http('POST', '/api/change_password', {
          'token': this.token,
          'password': this.password,
          'email': this.email,
        })
        this.overlay = false
        if (response.ok) {
          await Http('POST', '/api/logout')
          this.$emit('checkAuthCookie')
          this.overlay = false
          this.$router.push({name: 'login'})
        } else {
          throw new Error()
        }
      } catch (error) {
        this.error = this.$gettext('An error occurred')
        this.overlay = false
      }
    },
  },
  async created() {
    this.token = this.$route.query.token
    this.email = this.$route.query.email
  }
}
</script>
