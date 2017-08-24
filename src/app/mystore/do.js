import axios from '../utils/axios'
import router from '../../route'
const state = {
    totalSize: 0,
    currentId: '',
    catalogWid: '',
    dataSourceWid: '',
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    opObj: {},
    res: []
}

const actions = {
    async searchForDO({ commit }, param) {
        const { status, statusText, data } = await axios.post('/metadata/dataobject/query', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            console.log('查询成功')
            console.log(data)
            commit('searchForDO', data)
        }
        else {
            alert('操作失败')
        }
    },

    async createDO({ commit }, param) {
        const { status, statusText, data } = await axios.post('/metadata/dataobject/newCreate', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            alert('创建成功')
            router.go(-1)
            console.log(data)
            commit('createDO', data)
        }
        else {
            alert('操作失败')
        }
    },

    async modifyDO({ commit }, param) {
        const { status, statusText, data } = await axios.post('/metadata/dataobject/newUpdate', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            alert('修改成功')
            router.go(-1)
            console.log(data)
            commit('modifyDO', data)
        }
        else {
            alert('操作失败')
        }
    },
}

const mutations = {
    searchForDO(state, data) {
        state.pageNum = data.pageInfo.pageNum;
        state.pageSize = data.pageInfo.pageSize;
        state.totalSize = data.pageInfo.total;
        state.pages = data.pageInfo.pages;
        state.res = data.dataSet;
    },
    changeID(state,data){
        state.currentId = data;
    },
    createDO(state,data){
        
    },
    changeDOOpObj(state,data){
        console.log('dddddddddddddddddata')        
        console.log(data)
        state.opObj=data
    },
     changePageSize(state, item) {
        state.pageSize = item;

    },
    changePageNum(state, val) {
        state.pageNum = val
    },
    modifyDO(state,val){

    }
}

export default {
    state,
    actions,
    mutations
}