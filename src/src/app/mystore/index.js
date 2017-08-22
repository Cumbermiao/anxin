
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import ds from './ds'
import dob from './do'
import bo from './busiObj'
import bm from './busiManage'
import st from './scriptType'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        ds,
        dob,
        bo,
        bm,
        st
    }
})