import axios from '../../utils/axios';
import {SAFE_QUERY_LIST} from '../../constants/report';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [SAFE_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [SAFE_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, sysname = '', 
    tag_id = -1, stime = '', etime = ''} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_getPcAttackList', {
      pageNumber,
      pageSize,
      sysname,
      tag_id,
      stime,
      etime
    });
    if (status === 200) {
      commit(SAFE_QUERY_LIST, data.datas)
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