import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

// let app = null;

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  // if (!app) {
  //   app = new Vue({
  //     el: '#app',
  //     router,
  //     components: { App },
  //     template: '<App/>',
  //   });
  // }
});
/* eslint-disable no-new */
