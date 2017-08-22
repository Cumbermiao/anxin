
import axios from '../utils/axios'

// 首先声明一个状态 state
const state = {
    totalSize: 0,
    currentId: '',
    catalogWid: '',
    dataSourceWid: '',
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    opObj: {},
    testRes: '',
    //数据库连接用户名
    sjkljyhm: '',
    res: []
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
    // 数据源分页查询
    async searchForDS({ commit }, param) {
        const { status, statusText, data } = await axios.post('/data-open-web/metadata/datasource/query', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            console.log('查询成功')
            commit('searchForDS', data)
        }
        else {
            alert('操作失败')
        }
    },

}
// 更新状态
const mutations = {
    searchForDS(state, data) {
        state.pageNum = data.pageInfo.pageNum;
        state.pageSize = data.pageInfo.pageSize;
        state.totalSize = data.pageInfo.total;
        state.pages = data.pageInfo.pages;
        state.res = data.dataSet;
        console.log('state.res::::')
        console.log(state.res)
    },
    createDS(state, val) {
        axios.post('/data-open-web/metadata/datasource/create', val)
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    alert('创建成功')
                } else {
                    alert('操作失败')
                }
            }).catch((err) => {
                alert(err)
            })
    },
    testDS(state, val) {
        axios.post('/data-open-web/metadata/datasource/testConnection', val).
            then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    alert('测试成功')
                    state.testRes = true
                } else {
                    alert('操作失败')
                    state.testRes = false
                }
            })
    },
    changeDSOpObj(state, val) {
        state.opObj = val;
    },
    modifyDS(state, val) {
        axios.post('/data-open-web/metadata/datasource/update', val).
            then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    alert('修改成功')
                    state.testRes = true
                } else {
                    alert('操作失败')
                    state.testRes = false
                }
            })
    },
    removeDS(state, data) {
        axios.post('/data-open-web/metadata/datasource/deleteByWid', data, {
            "headers": {
                "content-type": "application/json"
            }
        }).then((res) => {
            if (res.status == 200 && res.data.returnStatus == 1) {
                alert('删除成功')
            } else {
                alert('操作失败')
            }
        }).catch((err) => {
            alert(err)
        })
    },
    changeID(state, id) {
        state.currentId = id;
    },
    changeKey(state, key) {
        state.keywords = key;

    },
    changeWid(state, wid) {
        state.dataSourceWid = wid;
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
    mutations,
    actions
}