import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'
Vue.use(Vuex)
// 首先声明一个状态 state
const state = {
    totalSize: 200,
    currentId: 1,
    catalogWid:'',
    dataSourceWid: '',
    keywords: '',
    pageNum: 1,
    pageSize: 20,
    pages: 1,
    res: [],
    rows: []
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
    // saveName({ commit }, msg) {
    //     commit('saveMsg', msg)    // 提交到mutations中处理    
    // },
    async searchInfo({ commit }, {currentId,keywords,pageNum,pageSize}) {
        const { status, statusText, data } = await axios.post('/data-open-web/api/realTimeQuery/query', { catalogWid: currentId,pageNum,pageSize });
        console.log(data)
        if (status === 200) {
            if (data.returnStatus == 1) {
                commit('searchInfo', data)
            } else {
                // commit(APP_ERROR, { status, statusText});
            }
        }
        else {
            // commit(APP_ERROR, { status, statusText });
        }
    },

    

}
// 更新状态
const mutations = {
    // saveMsg(state, msg) {
    //     state.msg = msg;
    // }
    searchInfo(state, data) {
        state.res = data
        console.log(data)
    },
    changeID(state, id) {
        // console.log(state.currentId)
        state.currentId = id;
    },
    changeKey(state, key) {
        state.keywords = key;
        // console.log('xxxx'+state.keywords)
        
    },
    changeWid(state,wid){
        state.dataSourceWid=wid;
        console.log( state.dataSourceWid)
    },
    create(state,val){
        console.log(val)
        axios.post('/data-open-web//api/realTimeQuery/create', val)
    }

}
// 获取状态信息
const getter = {
    // showState(state) {
    //     console.log(state.msg)
    // }
}


// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
    state,
    getter,
    mutations,
    actions
})