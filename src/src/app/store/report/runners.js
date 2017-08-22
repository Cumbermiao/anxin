import axios from '../../utils/axios';
import {RUNNERS_QUERY_LIST, RUNNERS_QUERY_CHART} from '../../constants/report';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0,
  chart: []
}

const mutations = {
  [RUNNERS_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  },
  [RUNNERS_QUERY_CHART](state, {data = []} = {}) {
    state.chart = data;
  }
}

const actions = {
  async [RUNNERS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, filter = '', days = 30} = {}) {
    const {status, statusText, data} = await axios.post('/axsh_new/sendapdex_getPcAccessStatic', {
      pageNumber,
      pageSize,
      days,
      filter
    });
    if (status === 200) {
      commit(RUNNERS_QUERY_LIST, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [RUNNERS_QUERY_CHART]({commit}, {sysid=-1} = {}) {
    const {status, statusText, data} = await axios.get('/axsh_new/sendapdex_getAccessStaticList', {
      params: {
        sysid
      }
    });
    if (status == 200) {
      commit(RUNNERS_QUERY_CHART, data);
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