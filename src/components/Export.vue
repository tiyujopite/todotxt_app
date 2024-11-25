<template>
  <div class="flex min-h-full flex-col justify-center">
    <Loading v-model:active="overlay"/>
    <div class="mx-2 sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="text-3xl font-semibold"><translate>Export</translate></h1>
      <p class="text"><translate>export_text</translate></p>
      <p class="font-semibold text-red-500 mt-1">{{ error }}</p>
      <button
      v-if="!filename && !filehref"
      class="flex w-full justify-center rounded-xl bg-green-600 px-3 p-2 font-semibold cursor-pointer mt-3"
      @click="generateExportFile()"
      :title="$gettext('Generate export file')">
        <translate>Generate export file</translate>
      </button>
      <a
      class="text-green-600 font-semibold"
      v-if="filename && filehref"
      :download="filename"
      :href="filehref"><translate>Download</translate>
      </a>
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
      filename: null,
      filehref: null
    }
  },
  methods: {
    async generateExportFile() {
      this.overlay = true
      this.error = ''
      try {
        let response = await Http('GET', '/api/export_file')
        this.overlay = false
        if (response.ok) {
          let data = await response.json()
          this.filename = data.filename
          this.filehref = data.filehref
        } else if (response.status == 401) {
          await Http('POST', '/api/logout')
          this.$emit('checkAuthCookie')
          this.overlay = false
          this.$router.push({name: 'login'})
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
