import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createGettext } from 'vue3-gettext'
import './index.css'
import translations from './assets/translations.json'

const app = createApp(App)

app.use(router)
const gettext = createGettext({
  availableLanguages: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
  },
  defaultLanguage: 'en',
  translations: translations,
})
app.use(gettext)

app.mount('#app')
