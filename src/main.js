import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store.js'
import { router } from './routes.js'
Vue.config.productionTip = false

Vue.use(vuetify);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
