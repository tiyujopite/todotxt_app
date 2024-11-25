<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-3xl font-semibold"><translate>Preferences</translate></h1>
      <div class="flex items-center">
        <input
        id="confirm"
        type="checkbox"
        class="w-5 h-5 cursor-pointer flex"
        v-model="email_backup"/>
        <label for="confirm" class="py-1 px-2 font-semibold">
        <translate>I want to receive a weekly email backup.</translate>
        </label>
      </div>
      <div class="flex flex-col">
        <label
          for="shared_projects"
          class="font-semibold my-1"
          >
          <translate>Shared projects</translate>
        </label>
        <textarea
        id="shared_projects"
        class="bg-secondary rounded-xl p-2"
        rows="15"
        v-model="shared_projects"
        :placeholder="shared_projects_placeholder"
        ></textarea>
      </div>
      <p class="font-semibold text-red-500 mt-1">{{ error }}</p>
      <button
      class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-3"
      @click="save"
      >
        <translate>Save</translate>
      </button>
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
      error: '',
      overlay: false,
      email_backup: false,
      shared_projects: '',
      shared_projects_placeholder: `[my_project]
email_to_share@foo.bar
other_email@foo.bar
[my_other_project]
other_email@foo.bar`,

    }
  },
  methods: {
    async save() {
      this.overlay = true
      this.error = ''
      try {
        let response = await Http('POST', '/api/preferences', {
          'email_backup': this.email_backup,
          'shared_projects': this.shared_projects,
        })
        this.overlay = false
        if (!response.ok) {
          this.error = this.$gettext('An error occurred')
        }
      } catch (error) {
        this.error = this.$gettext('An error occurred')
        console.log(error)
        this.overlay = false
      }
    }
  },
  async created() {
    this.overlay = true
    this.error = ''
    try {
      let response = await Http('GET', '/api/preferences')
      this.overlay = false
      if (response.ok) {
        let data = await response.json()
        this.email_backup = data.email_backup
        this.shared_projects = data.shared_projects
      } else if (response.status === 401 || response.status === 403) {
        await Http('POST', '/api/logout')
        this.$emit('checkAuthCookie')
        this.$router.push({name: 'login'})
      } else {
        this.error = this.$gettext('An error occurred')
      }
    } catch (error) {
      this.overlay = false
      this.error = this.$gettext('An error occurred')
      console.log(error)
    }
  },
}
</script>
