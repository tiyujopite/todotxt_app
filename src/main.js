// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createGettext } from 'vue3-gettext'
// import { Vue3Mq } from 'vue3-mq'
import './index.css'
import translations from './assets/translations.json'

const app = createApp(App)

app.use(router)
const gettext = createGettext({
  availableLanguages: {
    en: 'English',
    es: 'Español',
  },
  defaultLanguage: 'en',
  translations: translations,
})

app.use(gettext)

// app.use(Vue3Mq, {
//   breakpoints: {
//     phone: 0,
//     tablet: 768,
//     desktop: 1370,
//   }
// })


app.mount('#app')
// import 'bootstrap/dist/js/bootstrap.js'
