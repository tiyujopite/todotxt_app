<template>
  <li class="flex w-full justify-between items-center mb-2 rounded-xl select-none">
    <li class="flex w-full justify-center items-center pt-2 pb-2 rounded-xl px-3 duration-150 cursor-pointer accent-color-hover hover:scale-110"
    v-for="lang in supportedLanguages"
    @click="setLang(lang.code)" :title="lang.name">
      {{ lang.flag }}
    </li>
  </li>
</template>
<script>
import { Http } from '../http.js'

export default {
  data() {
    return {
      userLang: 'en',
      supportedLanguages: [
        {'code': 'en', flag: '🇬🇧', name: 'English'},
        {'code': 'es', flag: '🇪🇸', name: 'Español'},
        {'code': 'fr', flag: '🇫🇷', name: 'Français'},
      ],
    }
  },
  methods: {
    isAuthenticated() {
      return document.cookie.includes('authenticated=true')
    },
    getLang() {
      return localStorage.getItem('user-lang') || 'en'
    },
    async setLang(lang, init = false) {
      this.userLang = lang
      document.querySelector('html').setAttribute('lang', lang)
      localStorage.setItem('user-lang', lang)
      this.$language.current = lang
      if (this.isAuthenticated() && !init) {
        try {
          await Http('POST', '/api/preferences', {'lang': lang})
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
  created() {
    const initUserLang = this.getLang()
    this.setLang(initUserLang, true)
  },
}
</script>
