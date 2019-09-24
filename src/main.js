import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './assets/style/icon.css'
import i18n from './lang/index.js'
// import './assets/fonts/daysOne.css'
import './assets/style/global.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
