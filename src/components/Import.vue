<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-3xl font-semibold"><translate>Import</translate></h1>
      <p class="text"><translate>import_text</translate></p>
      <p class="text text-yellow-500 font-semibold"><translate>import_text_warning</translate></p>
      <div class="flex items-center">
        <input
        id="confirm"
        type="checkbox"
        class="w-5 h-5 cursor-pointer flex"
        v-model="confirm"/>
        <label for="confirm" class="py-1 px-2 font-semibold">
        <translate>I'm sure</translate>
        </label>
      </div>
      <div class="flex items-center">
        <input
        id="only_pending"
        type="checkbox"
        class="w-5 h-5 cursor-pointer flex"
        v-model="onlyPending"/>
        <label for="only_pending" class="py-1 px-2 font-semibold">
        <translate>Import only pending tasks</translate>
        </label>
      </div>
      <input
        id="file"
        type="file"
        accept=".txt"
        class="mt-1"
        @change="loadFile"/>
      <p class="font-semibold text-red-500 mt-1">{{ error }}</p>
      <button
      class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-3"
      :disabled="!confirm || !file"
      @click="importFile()"
      :title="$gettext('Import file')">
        <translate>Import file</translate>
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
      confirm: false,
      file: null,
      filecontent: null,
      onlyPending: true,
      overlay: false,
    }
  },
  methods: {
    loadFile(event) {
      this.file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsText(this.file)
      reader.addEventListener('load', () => {
        this.filecontent = reader.result
      }, false)
    },
    async importFile() {
      this.overlay = true
      this.error = ''
      try {
        let response = await Http('POST', '/api/import_file', {
          'content': this.filecontent,
          'only_pending': this.onlyPending
        })
        this.overlay = false

        if (response.ok) {
          this.$router.push({name: 'tasks'})
        } else if (response.status === 401 || response.status === 403) {
          await Http('POST', '/api/logout')
          this.$emit('checkAuthCookie')
          this.overlay = false
          this.$router.push({name: 'login'})
        } else if (response.status === 400) {
          let data = await response.json()
          this.error = this.$gettext(data.message)
        } else {
          this.error = this.$gettext('An error occurred')
        }
      } catch (error) {
        this.error = this.$gettext('An error occurred')
        console.log(error)
        this.overlay = false
      }
    }
  },
}
</script>
