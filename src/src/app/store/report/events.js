import axios from '../../utils/axios';
import {EVENTS_QUERY_CHART, EVENTS_QUERY_LIST} from '../../constants/report';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0,
  chart: []
}

const mutations = {
  [EVENTS_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  },
  [EVENTS_QUERY_CHART](state, {rows = []} = {}) {
    state.chart = rows;
  }
}

const actions = {
  async [EVENTS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, sysname = '', 
    level = -1, pretype = -1, stime = '', etime = ''} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_getPcPrecoreList', {
      pageNumber,
      pageSize,
      sysname,
      level,
      pretype,
      stime,
      etime
    });
    if (status === 200) {
      commit(EVENTS_QUERY_LIST, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [EVENTS_QUERY_CHART]({commit}, {pretype = -1, stime = '', etime = ''} = {}) {
    const {status, statusText, data} = await axios.get('/cldPortal_new/sendapdex_getPcPrecoreListView', {
      params: {
        pretype,
        stime,
        etime
      }
    });
    if (status == 200) {
      commit(EVENTS_QUERY_CHART, data.datas);
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