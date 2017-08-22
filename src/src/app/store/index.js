import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import apps from './config/apps';
import dbs from './config/dbs';
import middlewares from './config/middlewares'
import hosts from './config/hosts'
import odis from './config/odis'
import urls from './config/urls'
// report
import runners from './report/runners';
import events from './report/events';
import safe from './report/safe';
import black from './report/black';
import datascreen from './report/datascreen';
//data
import manufacturer from './data/manufacturer';
import resources from './data/resources';
import home from './home/home';
Vue.use(Vuex)


const initialState = {
  breads: []
  // url  => view  
  // view => url  如何实现双向绑定
}


export default new Vuex.Store({
  state: initialState,
  mutations,
  modules: {
    apps,
    dbs,
    middlewares,
    hosts,
    odis,
    urls,
    runners,
    events,
    safe,
    black,
    manufacturer,
    resources,
    home,
    datascreen
  }
})