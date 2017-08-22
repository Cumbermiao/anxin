import axios from '../utils/axios'
import router from '../../route'

const state = {
    currentId: '',
    opObj: {},
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    totalSize: 0,
    res: [],
}

const actions = {
    async SearchForScript({ commit }, param) {
        const { status, statusText, data } = await axios.post('/compute/script/query', param)
        if (status == 200 && data.returnStatus == 1) {
            console.log("data")
            console.log(data)
            commit('SearchForScript', data)
        } else {
            alert('请求失败')
        }
    },

    async createScript({ commit }, param) {
        const { status, statusText, data } = await axios.post('/compute/script/create', param)
        if (status == 200 && data.returnStatus == 1) {
            alert('创建成功')
            commit('createScript')
        } else {
            alert('请求失败')
        }
    },

    async modifyScript({ commit }, param) {
        const { status, statusText, data } = await axios.post('/compute/script/update', param)
        if (status == 200 && data.returnStatus == 1) {
            alert('修改成功')
            commit('modifyScript')
        } else {
            alert('请求失败')
        }
    }
}

const mutations = {

    changeScriptId(state, data) {
        state.currentId = data
    },

    SearchForScript(state, data) {
        state.pageNum = data.pageInfo.pageNum;
        state.pageSize = data.pageInfo.pageSize;
        state.totalSize = data.pageInfo.total;
        state.pages = data.pageInfo.pages;
        state.res = data.dataSet
    },

    changeSriptOpObj(state, data) {
        state.opObj = data
    },

    createScript(state, data) {

    },

    removeScript(state, data) {
        axios.post('/compute/script/delete', data)
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    alert('操作成功')
                } else {
                    alert('操作失败')
                }
            }).catch((err) => {
                alert('操作失败')
            })

    },

    modifyScript(state,data){

    },

     changePageSize(state, item) {
        state.pageSize = item;

    },
    changePageNum(state, val) {
        state.pageNum = val
    },
}

export default {
    state,
    actions,
    mutations
}