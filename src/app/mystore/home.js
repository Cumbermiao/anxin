
import axios from '../utils/axios'
import router from '../../route'

// 首先声明一个状态 state
const state = {
    totalSize: 0,
    currentId: '',
    catalogWid: '',
    dataSourceWid: '',
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    res: [],
    rows: [],
    outParams: [],
    inParams: [],
    testArr: [],
    opObj: {}
    // wid:'',
    // queryIntfName: '',
    // queryIntfDesc: '',
    // sqlTemplate: '',
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
    // 分页查询
    async searchInfo({ commit }, param) {
        const { status, statusText, data } = await axios.post('/api/realTimeQuery/query', param);
        // console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            commit('searchInfo', data)
        }
        else {
            alert('操作失败')
        }
    },
    //sql查询
    async askForSql({ commit }, { dataSourceWid, sqlTemplate }) {
        const { status, statusText, data } = await axios.post('/api/realTimeQuery/getInOutParams', { dataSourceWid, sqlTemplate });
        if (status === 200 && data.returnStatus == 1) {
            commit('askForSql', data)
        }
        else {
        }
    },
    //测试获取服务信息
    async testQuery({ commit }, param) {
        console.log(param)
        const { status, statusText, data } = await axios.post('/api/realTimeQuery/test', param);
        console.log('xxxxx')
        console.log(data)
        if (status === 200 && data.returnStatus == 1) {
            commit('testQuery', data)
        }
        else {
            alert('操作失败')
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
        console.log('state.res::::')
        console.log(state.res)
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
    create(state, val) {
        axios.post('//api/realTimeQuery/create', val)
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    alert('创建成功')
                    // dispatch('searchInfo',)
                    router.go(-1)
                } else {
                    alert('操作失败')
                }
            }).catch((err) => {
                alert(err)
            })
    },
    changePageSize(state, item) {
        state.pageSize = item;

    },
    changePageNum(state, val) {
        state.pageNum = val
    },
    changeOpObj(state, val) {
        state.opObj = val;
    },
    askForSql(state, data) {
        state.inParams = data.dataSet.inParams[0];
        state.outParams = data.dataSet.outParams;
    },
    testQuery(state, data) {
        state.testArr = data.dataSet
    },
    modify(state, data) {
        axios.post('/api/realTimeQuery/update', data)
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    alert('修改成功')
                    router.go(-1)
                } else {
                    alert('操作失败')
                }
            }).catch((err) => {
                alert(err)
            })
    },
    remove(state, data) {
        axios.post('/api/realTimeQuery/deleteByWid',data, {
            "headers": {
                "content-type": "application/json"
            }
        }).then((res) => {
            if (res.status == 200 && res.data.returnStatus==1) {
                alert('删除成功')
                router.go(0)
            } else {
                alert('操作失败')
            }
        }).catch((err) => {
            alert(err)
        })
    }

}
// 获取状态信息
const getter = {
    // showState(state) {
    //     console.log(state.msg)
    // }
}


// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default {
    state,
    getter,
    mutations,
    actions
}