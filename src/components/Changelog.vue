<template>
  <section>
    <div class="container mt-8 px-3 py-8">
      <div class="w-full p-4 markdown" v-html="changelog"></div>
    </div>
  </section>
</template>
<script>
import Package from '/package.json'
import { marked } from 'marked'
export default {
  data() {
    return {
      version: Package.version,
      changelog: '',
    }
  },
  async created() {
    try {
      let file = await (await fetch('/CHANGELOG.md')).text()
      this.changelog = marked(file)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
