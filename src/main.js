import Vue from 'vue';
import plugins from '@/plugins';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
