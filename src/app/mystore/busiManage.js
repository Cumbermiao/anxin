import axios from '../utils/axios'
import router from '../../route'
const state = {
    currentId: '',
    // catalogWid: '',
    // dataSourceWid: '',
    // pageNum: 1,
    // pageSize: 10,
    // pages: 0,
    // totalSize:0,
    opObj: {},
    // res: []
    // 
}

const actions = {
    async  SearchForBM({ commit }, param) {
        const { status, statusText, data } = await axios.post('/common/catalog/queryByWid', param, { "headers": { "content-type": "application/json" } })
        if (status === 200 && data.returnStatus == 1) {
            // alert('查询成功')
            console.log(data)
            commit('SearchForBM', data)
        }
        else {
            alert('操作失败')
        }
    }

}

const mutations = {
    changeBMId(state, data) {
        state.currentId = data;
    },
    SearchForBM(state, data) {

        state.opObj = data.dataSet
    },
    modifyBM(state, data) {
        axios.post('/common/catalog/update', data)
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
    removeBM(state, data) {
        axios.post('/common/catalog/deleteByWid', data, { "headers": { "content-type": "application/json" } })
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
    createBM(state, data) {
        axios.post('/common/catalog/create', data)
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