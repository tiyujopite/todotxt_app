<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-3xl font-semibold"><translate>Change password</translate></h1>
      <h1 class="text" v-if="!success"><translate>change_password_text</translate></h1>
      <h1 class="text-xl text-green-600" v-if="success"><translate>Email sended.</translate></h1>
      <form @submit.prevent="sendMail" v-if="!success">
        <input
        id="email"
        required
        minlength="3"
        autocapitalize="off"
        type="email"
        class="w-full rounded-xl border-0 bg-secondary p-2 mt-6"
        :placeholder="$gettext('Email')"
        v-model="email">
        <p id="error" class="font-semibold text-red-500 mt-1">{{ error }}</p>
        <button
        class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-1"
        :class="error.length > 0 ? 'mt-1' : 'mt-8'"
        type="submit"
        ><translate>Send email</translate></button>
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
      email: '',
      error: '',
      overlay: false,
      success: false,
    }
  },
  methods: {
    async sendMail() {
      this.overlay = true
      this.error = ''
      try {
        let response = await Http('POST', '/api/change_password', {
          'email': this.email,
        })
        this.overlay = false
        if (response.ok) {
          this.success = true
        } else if (response.status === 400) {
          let data = await response.json()
          this.error = this.$gettext(data.message)
        } else {
          throw new Error()
        }
      } catch (error) {
        this.error = this.$gettext('An error occurred')
        this.overlay = false
      }
    },
  },
}
</script>
