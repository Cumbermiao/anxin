import axios from '../../utils/axios';
import {DBS_QUERY_LIST} from '../../constants/config';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [DBS_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [DBS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, dbtype = 0} = {}) {
    const {status, statusText, data} = await axios.get('/axsh_new/sendapdex_getPcDbList', {
      params: {
        pageNumber,
        pageSize,
        dbtype
      }
    });
    if (status === 200) {
      commit(DBS_QUERY_LIST, data.datas)
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