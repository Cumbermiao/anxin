import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'
Vue.use(Vuex)
// 首先声明一个状态 state
const state = {
    totalSize: 200,
    currentId: '',
    catalogWid: '',
    dataSourceWid: '',
    pageNum: 1,
    pageSize: 2,
    pages: 0,
    res: [],
    rows: [],
    outParams: [],
    inParams: [],
    testArr:[]
    // wid:'',
    // queryIntfName: '',
    // queryIntfDesc: '',
    // sqlTemplate: '',
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
    // 分页查询
    async searchInfo({ commit }, param) {
        const { status, statusText, data } = await axios.post('/data-open-web/api/realTimeQuery/query', param);
        // console.log(data)
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
    //sql查询
    async askForSql({ commit }, { dataSourceWid, sqlTemplate }) {
        const { status, statusText, data } = await axios.post('/data-open-web/api/realTimeQuery/getInOutParams', { dataSourceWid, sqlTemplate });
        if (status === 200) {
            if (data.returnStatus == 1) {
                commit('askForSql', data)
            } else {

            }
        }
        else {
        }
    },
    //测试获取服务信息
    async testQuery({ commit }, param) {
        console.log(param)
        const { status, statusText, data } = await axios.post('/data-open-web/api/realTimeQuery/test', param);
        console.log('xxxxx')
        console.log(data)
        if (status === 200) {
            if (data.returnStatus == 1) {
                commit('testQuery', data)
            } else {

            }
        }
        else {
        }
    },



}
// 更新状态
const mutations = {

    searchInfo(state, data) {
        state.pageNum = data.pageInfo.pageNum;
        state.pageSize = data.pageInfo.pageSize;
        state.totalSize = data.pageInfo.total;
        state.pages = data.pageInfo.pages;
        state.res = data.dataSet
        console.log(state.res)
    },
    changeID(state, id) {
        // console.log(state.currentId)
        state.currentId = id;
    },
    changeKey(state, key) {
        state.keywords = key;
        // console.log('xxxx'+state.keywords)

    },
    changeWid(state, wid) {
        state.dataSourceWid = wid;
        console.log(state.dataSourceWid)
    },
    create(state, val) {
        console.log(val)
        axios.post('/data-open-web//api/realTimeQuery/create', val)
        .then((res)=>{
            if(res.status==200&&res.returnStatus){
                alert('创建成功')
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    changePageSize(state, item) {
        state.pageSize = item;
        console.log('state.pageSize::::' + state.pageSize)
    },
    changePageNum(state,val){
        state.pageNum = val
    },
    askForSql(state, data) {
        state.inParams = data.dataSet.inParams[0];
        state.outParams = data.dataSet.outParams;
        console.log(state.inParams);
        console.log(state.outParams);
    },
    testQuery(state,data){
        state.testArr= data.dataSet
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