<template>
  <li
  class="flex w-full justify-between items-center pt-2 pb-2 mb-2 rounded-xl px-3 duration-150 cursor-pointer accent-color-hover hover:scale-110"
  @click="toggleTheme">
    <div class="flex items-center select-none">
      <i :class="userTheme === 'light-theme' ? 'bi bi-lightbulb-off' : 'bi bi-lightbulb'"></i>
      <translate class="ml-2">Toggle theme</translate>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      userTheme: 'light',
    }
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem('user-theme')
      if (activeTheme === 'light')
        this.setTheme('dark')
      else
        this.setTheme('light')
    },
    getTheme() {
      return localStorage.getItem('user-theme')
    },
    setTheme(theme) {
      localStorage.setItem('user-theme', theme)
      this.userTheme = theme
      document.documentElement.setAttribute('data-theme', theme);
    },
    getMediaPreference() {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        return 'dark'
      else
        return 'light'
    },
  },
  created() {
    this.setTheme(this.getTheme() || this.getMediaPreference())
  },
}
</script>
