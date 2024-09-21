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
    getLang() {
      return localStorage.getItem('user-lang') || 'en'
    },
    setLang(lang) {
      this.userLang = lang
      document.querySelector('html').setAttribute('lang', lang)
      localStorage.setItem('user-lang', lang)
      this.$language.current = lang
    },
  },
  created() {
    const initUserLang = this.getLang()
    this.setLang(initUserLang)
  },
}
</script>
