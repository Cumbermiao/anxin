import axios from '../utils/axios'

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
        const { status, statusText, data } = await axios.post('/data-open-web/metadata/dataobject/query', param);
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
}

const mutations = {
    searchForDO(state, data) {
        state.res = data.dataSet
    },
    changeID(state,data){
        state.currentId = data;
    }
}

export default {
    state,
    actions,
    mutations
}