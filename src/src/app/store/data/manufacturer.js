import axios from '../../utils/axios';
import {MANUFACTURER_QUERY_LIST} from '../../constants/data';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [MANUFACTURER_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [MANUFACTURER_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, sysname = '', days = 30} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_getpcPzxxStatic', {
      pageNumber,
      pageSize,
      days,
      sysname
    });
    if (status === 200) {
      commit(MANUFACTURER_QUERY_LIST, data.datas)
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