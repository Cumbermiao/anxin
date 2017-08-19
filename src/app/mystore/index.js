
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import ds from './ds'
import dob from './do'
import bo from './busiObj'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        ds,
        dob,
        bo
    }
})