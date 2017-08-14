import axios from '../../utils/axios';
import {HOME_HEADER_QUERY, HOME_WATER_QUERY, HOME_FOCUS_APPS, HOME_TABLE_LIST} from '../../constants/home';
import {APP_ERROR} from '../../constants/common';
const initState = {
  score: 0,// 水球分数
  enablescore: 0, // 可用分
  safescore: 0, // 安全分
  todaycount: 0, // 今日次数
  totalprotectcount: 0, // 总防护次数
  enabletodocount: 0, // 未处理数
  enabletotalcount: 0, // 总故障数
  safetodocount: 0 , // 安全漏洞
  safetotalcount: 0, // 总安全漏洞
  focus: {
    rows: [],
    totalSize: 0,
    problemappcount: 0
  },
  table: {
    rows: [],
    totalSize: 0,
    safecount: 0
  }
}

const mutations = {
  [HOME_WATER_QUERY](state, {totalscore = 0, enablescore = 0, safescore = 0} = {}) {
    state.score = parseInt(totalscore);
    state.enablescore = parseInt(enablescore);
    state.safescore = parseInt(safescore);
  },
  [HOME_HEADER_QUERY](state, {todaycount = 0, totalprotectcount = 0, enabletodocount = 0, 
    enabletotalcount = 0, safetodocount = 0, safetotalcount = 0} = {}) {
      state.todaycount = parseInt(todaycount);
      state.totalprotectcount = parseInt(totalprotectcount);
      state.enabletodocount = parseInt(enabletodocount);
      state.enabletotalcount = parseInt(enabletotalcount);
      state.safetodocount = parseInt(safetodocount);
      state.safetotalcount = parseInt(safetotalcount);
  },
  [HOME_FOCUS_APPS](state, {datas = [], totalappcount = 0, problemappcount = 0} = {}) {
    state.focus.rows = datas;
    state.focus.totalSize = parseInt(totalappcount);
    state.focus.problemappcount = parseInt(problemappcount);
  },
  [HOME_TABLE_LIST](state, {datas = [], enablecount = 0, safecount = 0} = {}) {
    state.table.rows = datas;
    state.table.totalSize = parseInt(enablecount);
    state.table.safecount = parseInt(safecount);
  }
}

const actions = {
  async [HOME_WATER_QUERY]({commit}) {
    const {status, statusText, data} = await axios.get('/cldPortal_new/sendapdex_bigscreentodo', {
        params: {
          pageNumber: 1
        }
    });
    if (status === 200) {
      commit(HOME_WATER_QUERY, data)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [HOME_HEADER_QUERY]({commit}) {
    const {status, statusText, data} = await axios.get('/cldPortal_new/sendapdex_bigscreenleft', {params: {}});
    if (status === 200) {
      commit(HOME_HEADER_QUERY, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [HOME_FOCUS_APPS]({commit}) {
    const {status, statusText, data} = await axios.get('/cldPortal_new/sendapdex_pcapplistget', {params: {}});
    if (status === 200) {
      commit(HOME_FOCUS_APPS, data);
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [HOME_TABLE_LIST]({commit}, {pageNumber = 1, pageSize = 5} = {}) {
    const {status, statusText, data} = await axios.get('/cldPortal_new/sendapdex_bigscreentodo', {
      params: {
        pageNumber: pageNumber, 
        pageSize: pageSize
      }
    });
    if (status === 200) {
      commit(HOME_TABLE_LIST, data);
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  }
}

export default {
  state: initState,
  mutations,
  actions
}