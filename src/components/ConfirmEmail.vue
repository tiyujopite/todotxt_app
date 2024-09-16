<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="text-3xl font-semibold"><translate>Email confirmation</translate></h1>
      <h1 class="text-xl text-green-600" v-if="success"><translate>confirm_email_ok</translate></h1>
      <h1 class="text-xl text-red-500" v-if="error"><translate>confirm_email_error1</translate></h1>
      <h1 class="text-xl text-red-500" v-if="error"><translate>confirm_email_error2</translate></h1>
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
      token: null,
      success: false,
      error: true,
      overlay: false,
    }
  },
  methods: {
  },
  async created() {
    this.token = this.$route.query.token
    this.overlay = true
      this.error = ''
      try {
        let response = await Http('POST', '/api/confirm_email', { 'token': this.token })
        this.overlay = false
        if (response.ok) {
          this.success = true
        } else {
          this.error = true
        }
      } catch (error) {
        this.error = true
        this.overlay = false
      }
  }
}
</script>
