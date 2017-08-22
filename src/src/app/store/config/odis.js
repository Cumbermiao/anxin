import axios from '../../utils/axios';
import {ODIS_QUERY_LIST} from '../../constants/config';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [ODIS_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [ODIS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, odistatus = -1} = {}) {
    const {status, statusText, data} = await axios.post('/axsh_new/sendapdex_odilist', {
      pageNumber,
      pageSize,
      odistatus
    });
    if (status === 200) {
      commit(ODIS_QUERY_LIST, data.datas)
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