import axios from '../utils/axios'
import router from '../../route'
const state = {

    currentId: '',
    catalogWid: '',
    dataSourceWid: '',
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    totalSize:0,
    opObj: {},
    res: [],
    searchType:'searchForBO'
}

const actions = {
    async searchForBO({ commit }, param) {
        const { status, statusText, data } = await axios.post('/metadata/busiData/queryPage', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            console.log('查询成功')
            console.log(data)
            commit('searchForBO', data)
        }
        else {
            alert('操作失败')
        }
    },
    async createBO({ commit }, param) {
        const { status, statusText, data } = await axios.post('/metadata/busiData/create', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            alert('操作成功')
            console.log(data)
            commit('createBO', data)
        }
        else {
            alert('操作失败')
        }
    },

    async updateBO({ commit }, param) {
        const { status, statusText, data } = await axios.post('/metadata/busiData/update', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            console.log('操作成功')
            console.log(data)
            commit('updateBO', data)
        }
        else {
            alert('操作失败')
        }
    },
}

const mutations = {
    searchForBO(state, data) {
        state.res = data.dataSet;
        state.pageNum = data.pageInfo.pageNum;
        state.pageSize = data.pageInfo.pageSize;
        state.totalSize = data.pageInfo.total;
        state.pages = data.pageInfo.pages;
    },
    changeBOID(state, data) {
        state.currentId = data;
    },
    changeBOOpObj(state, val) {
        console.log('changeOpObj!!!')
        console.log(val)
        state.opObj = val;
    },
    createBO(state, val) {

    },
    removeBO(state, val) {
        console.log('val:::' + val)
        axios.post('/metadata/busiData/deleteByWid', val, { "headers": { "content-type": "application/json" } })
            .then((res) => {
                if (res.status === 200 && res.data.returnStatus == 1) {
                    alert('操作成功')
                } else {
                    alert('操作失败')
                }
            }).catch((err) => {
                alert(err)
            })
    },
    updateBO(state, val) {

    },
}

export default {
    state,
    actions,
    mutations
}