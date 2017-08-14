import axios from '../../utils/axios';
import {BLACK_QUERY_LIST} from '../../constants/report';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0
}

const mutations = {
  [BLACK_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [BLACK_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, sysname = '', 
    sfqy = -1, selecttype = -1, stime = '', etime = ''} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_getBlackWhite', {
      pageNumber,
      pageSize,
      sysname,
      sfqy,
      selecttype,
      stime,
      etime
    });
    if (status === 200) {
      commit(BLACK_QUERY_LIST, data.datas)
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