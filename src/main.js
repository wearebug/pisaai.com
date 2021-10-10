import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MetaInfo from 'vue-meta-info'
import vuetify from './plugins/vuetify'
import FileUpload from 'vue-upload-component'
import VueToast from 'vue-toast-notification'
import VueSlider from 'vue-slider-component'

import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-slider-component/theme/default.css'

Vue.use(MetaInfo)
Vue.use(VueToast, {
  position: 'top',
})

Vue.component('vue-slider', VueSlider)
Vue.component('file-upload', FileUpload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app')
