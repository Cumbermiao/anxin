import axios from '../utils/axios'
const state = {
    currentId: '',
    opObj: {},
    // res: []
    // 
}

const actions = {
    async  SearchForST({ commit }, param) {
        const { status, statusText, data } = await axios.post('/data-open-web/common/catalog/queryByWid', param, { "headers": { "content-type": "application/json" } })
        if (status === 200 && data.returnStatus == 1) {
            // alert('查询成功')
            console.log('data')
            console.log(data)
            commit('SearchForST', data)
        }
        else {
            alert('操作失败')
        }
    }

}

const mutations = {
    changeSTId(state, data) {
        state.currentId = data;
    },
    SearchForST(state, data) {

        state.opObj = data.dataSet
        console.log('state.opObj')
        console.log(state.opObj)
    },
    modifyST(state, data) {
        axios.post('/data-open-web/common/catalog/update', data)
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
    removeST(state, data) {
        axios.post('/data-open-web/common/catalog/deleteByWid', data, { "headers": { "content-type": "application/json" } })
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
    createST(state, data) {
        axios.post('/data-open-web/common/catalog/create', data)
            .then((res) => {
                if (res.status === 200 && res.data.returnStatus == 1) {
                    alert('操作成功')
                } else {
                    alert('操作失败')
                }
            }).catch((err) => {
                alert(err)
            })
    }
}

export default {
    state,
    actions,
    mutations
}