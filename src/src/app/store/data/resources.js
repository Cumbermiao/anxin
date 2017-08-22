import axios from '../../utils/axios';
import {RESOURCES_QUERY_LIST} from '../../constants/data';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [RESOURCES_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [RESOURCES_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, filter = '', days = 30} = {}) {
    const {status, statusText, data} = await axios.post('/axsh_new/sendapdex_getPcHostsStatic', {
      pageNumber,
      pageSize,
      days,
      filter
    });
    if (status === 200) {
      commit(RESOURCES_QUERY_LIST, data.datas)
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