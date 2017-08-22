import Vue from 'vue';
// import 'font-awesome/css/font-awesome.min.css';
// import '~/pure-min.css';
import 'font-awesome/css/font-awesome.css';
// import 'bulma/css/bulma.css';
import '~/index.css';

import router from './route';
import store from './app/mystore/index';


export default new Vue({
  el: '#root',
  router,
  store,
  render: h => h('router-view')
});
