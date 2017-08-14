import axios from '../../utils/axios';
import {URLS_QUERY_LIST} from '../../constants/config';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [URLS_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [URLS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, urlstatus = -1, searchname = ''} = {}) {
    const {status, statusText, data} = await axios.post('/axsh_new/sendapdex_sysurllist', {
      pageNumber,
      pageSize,
      urlstatus,
      searchname
    });
    if (status === 200) {
      commit(URLS_QUERY_LIST, data.datas)
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