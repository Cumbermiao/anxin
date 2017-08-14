import axios from '../../utils/axios';
import {APPS_QUERY_LIST, APPS_DETAIL_SYSCOUNT, 
  APPS_DETAIL_ERRORCOUNT, APPS_DETAIL_SELECT, APPS_DETAIL_LIST, 
  APPS_DETAIL_ATTACK, APPS_DETAIL_BUG} from '../../constants/config';
import {APP_ERROR} from '../../constants/common';

const initState = {
  rows: [],
  totalSize: 0,
  detail: {
    rows: [],
    totalSize: 0,
    sysCount: {
      alarmcount: 0,
      attackCount: 0,
      dedcount: 0,
      safecount: 0
    },
    errorCount: {
      dbcount: 0,
      hostcount: 0,
      midcount: 0,
      netcount: 0,
      urlcount: 0
    },
    select: []
  }
}

const mutations = {
  /**
   * apps列表数据
   * 
   * @param {any} state 
   * @param {any} [{totalSize = 0, rows = []}={}] 
   */
  [APPS_QUERY_LIST](state, {totalSize = 0, rows = []}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  },
  /**
   * 获取系统相关数
   * alarmcount 总风险数
   * attackCount 总攻击数
   * dedcount 总宕机数
   * safecount 总漏洞数
   * 
   * @param {any} state 
   * @param {any} {alarmcount = 0, attackCount = 0, dedcount = 0, safecount = 0} 
   */
  [APPS_DETAIL_SYSCOUNT](state, {alarmcount = 0, attackCount = 0, dedcount = 0, safecount = 0} = {}) {
    state.detail.sysCount = {
      alarmcount: parseInt(alarmcount), 
      attackCount: parseInt(attackCount), 
      dedcount: parseInt(dedcount), 
      safecount: parseInt(safecount)
    };
  },
  /**
   * 获取详情页 tab上错误数
   * 
   * urlcount 可访问性
   * midcount 中间件
   * hostcount 主机
   * dbcount 数据库
   * netcount 链路
   * @param {any} state 
   * @param {any} [{dbcount = 0, hostcount = 0, midcount = 0, netcount = 0, urlcount = 0}={}] 
   */
  [APPS_DETAIL_ERRORCOUNT](state, {dbcount = 0, hostcount = 0, midcount = 0, netcount = 0, urlcount = 0} = {}) {
    state.detail.errorCount = {
      dbcount: parseInt(dbcount), 
      hostcount: parseInt(hostcount), 
      midcount: parseInt(midcount), 
      netcount: parseInt(netcount),
      urlcount: parseInt(urlcount)
    };
  },
  /**
   * 获取详情页 下拉框数据
   * 
   * @param {any} state 
   * @param {any} [{rows = []}={}] 
   */
  [APPS_DETAIL_SELECT](state, {rows = []} = {}) {
    state.detail.select = rows;
  },
  /**
   * 获取应用详情列表
   * 
   * @param {any} state 
   * @param {any} [{totalSize = 0, rows = []}={}] 
   */
  [APPS_DETAIL_LIST](state, {totalSize = 0, rows = []} = {}) {
    state.detail.rows = rows;
    state.detail.totalSize = parseInt(totalSize);
  }
}

const actions = {
  /**
   * 查询应用列表
   * 
   * @param {context} {commit} 
   * @param {any} [{pageNumber = 1, pageSize = 10}={}] 查询参数
   */
  async [APPS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, sysname = "", errorstate = -1} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_pcappalllistget', {
      pageNumber,
      pageSize,
      sysname,
      errorstate
    });
    if (status === 200) {
      commit(APPS_QUERY_LIST, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  /**
   * 获取系统相关数
   * 
   * @param {any} {commit} 
   * @param {any} [{sysid = -1}={}] sysid 系统id
   */
  async [APPS_DETAIL_SYSCOUNT]({commit}, {sysid = -1} = {}) {
    const {status, statusText, data} = await axios.get('/cldPortal_new/sendapdex_getPcSysDetailCount', {
      params: {
        sysid
      }
    });
    if (status == 200) {
      commit(APPS_DETAIL_SYSCOUNT, data);
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [APPS_DETAIL_ERRORCOUNT]({commit}, {domainid = -1} = {}) {
    const {status, statusText, data} = await axios.get('/axsh_new/sendapdex_getErrorKPIs', {
      params: {
        domainid
      }
    });
    if (status == 200) {
      commit(APPS_DETAIL_ERRORCOUNT, data.datas);
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [APPS_DETAIL_SELECT]({commit}, {devicetype = '', domainid = -1} = {}) {
    const {status, statusText, data} = await axios.get('/axsh_new/sendapdex_pcPicSelectList', {
      params: {
        devicetype,
        domainid
      }
    });
    if (status == 200) {
      commit(APPS_DETAIL_SELECT, data.datas);
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [APPS_DETAIL_LIST]({commit}, {pageNumber = 1, pageSize = 10, devicetype = '', deviceid = -1, domainid = -1, s = null} = {}) {
    const {status, statusText, data} = await axios.get('/axsh_new/sendapdex_sysdetail', {
      params: {
        pageNumber,
        pageSize,
        devicetype,
        deviceid,
        domainid,
        status: s
      }
    });
    if (status === 200) {
      commit(APPS_DETAIL_LIST, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [APPS_DETAIL_ATTACK]({commit}, {pageNumber = 1, pageSize = 10, sysid = ''} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_getPcAttackList', {
        pageNumber,
        pageSize,
        sysid
    });
    if (status === 200) {
      commit(APPS_DETAIL_LIST, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [APPS_DETAIL_BUG]({commit}, {pageNumber = 1, pageSize = 10, sysid = ''} = {}) {
    const {status, statusText, data} = await axios.post('/cldPortal_new/sendapdex_getPcPrecoreList', {
        pageNumber,
        pageSize,
        sysid,
        is_solve: 0,
        pretype: 1
    });
    if (status === 200) {
      commit(APPS_DETAIL_LIST, data.datas)
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