import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
// import VueI18n from 'vue-i18n'
import lang from '@/utils/lang'

Vue.use(Vuetify)
// Vue.use(VueI18n)
import zhHans from 'vuetify/es5/locale/zh-Hans'
import ja from 'vuetify/es5/locale/ja'
import en from 'vuetify/es5/locale/en'
import es from 'vuetify/es5/locale/es'
import fr from 'vuetify/es5/locale/fr'

const locales = {
  zhHans: { ...zhHans, ...lang.chinese },
  en: { ...en, ...lang.english },
  ja: { ...ja, ...lang.japanese },
  es: { ...es, ...lang.spanish },
  fr: { ...fr, ...lang.french },
}
// const i18n = new VueI18n({
//   locale: 'zhHans', // set locale
//   messages, // set locale messages
// })
// console.log(i18n)
export default new Vuetify({
  lang: {
    current: 'zhHans',
    locales: locales,
  },
  theme: {
    themes: {
      light: {
        primary: '#DB8819',
        black: '#333333',
      },
    },
  },
})
