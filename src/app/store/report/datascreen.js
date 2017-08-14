import axios from '../../utils/axios';
import {SCREEN_DATA_TOTAL, SCREEN_DATA_APPS} from '../../constants/report';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  appCount: 0,
  hostAppCount: 0,
  notHostAppCount: 0,
  apps: {}
}

const mutations = {
  [SCREEN_DATA_TOTAL](state, {systemList = [], appCount = 0, hostAppCount = 0, notHostAppCount = 0} = {}) {
    state.rows = systemList;
    state.appCount = parseInt(appCount);
    state.hostAppCount = parseInt(hostAppCount);
    state.notHostAppCount = parseInt(notHostAppCount);
  },
  [SCREEN_DATA_APPS](state, apps = {}) {
    state.apps = apps;
  }
}

const actions = {
  async [SCREEN_DATA_TOTAL]({commit}) {
    const {status, statusText, data} = await axios.get('/axsh_new/analysis_total', {params:{}});
    if (status === 200) {
      commit(SCREEN_DATA_TOTAL, data)
      return data;
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [SCREEN_DATA_APPS]({commit}) {
    const {status, statusText, data} = await axios.get('/axsh_new/analysis_findBySysApp', {params:{}});
    if (status === 200) {
      commit(SCREEN_DATA_APPS, data)
      return data;
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
}

export default {
  state: initState,
  mutations,
  actions
}