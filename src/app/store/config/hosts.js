import axios from '../../utils/axios';
import {HOSTS_QUERY_LIST, HOSTS_QUERY_DETAIL} from '../../constants/config';
import {APP_ERROR} from '../../constants/common';
const initState = {
  rows: [],
  totalSize: 0,
  detail: {
    rows: [],
    totalSize: 0
  }
}

const mutations = {
  [HOSTS_QUERY_LIST](state, {rows = [], totalSize = 0} = {}) {
    state.rows = rows;
    state.totalSize = parseInt(totalSize);
  },
  [HOSTS_QUERY_DETAIL](state, {rows = [], totalSize = 0} = {}) {
    state.detail.rows = rows;
    state.detail.totalSize = parseInt(totalSize);
  }
}

const actions = {
  async [HOSTS_QUERY_LIST]({commit}, {pageNumber = 1, pageSize = 10, odistatus = -1, filter = ''} = {}) {
    const {status, statusText, data} = await axios.post('/axsh_new/sendapdex_pchostlist', {
      pageNumber,
      pageSize,
      odistatus,
      filter: filter
    });
    if (status === 200) {
      commit(HOSTS_QUERY_LIST, data.datas)
    } else {
      commit(APP_ERROR, {status, statusText});
    }
  },
  async [HOSTS_QUERY_DETAIL]({commit}, {type='url', pageNumber = 1, pageSize = 10} = {}) {
    if (type == 'url') {
      const {status, statusText, data} = await axios.post('/axsh_new/sendapdex_sysdetail', {
        pageNumber,
        pageSize,
        deviceid: "67",
        devicetype: "host",
        domainid: "513"
      });
      if (status === 200) {
        commit(HOSTS_QUERY_DETAIL, data.datas)
      } else {
        commit(APP_ERROR, {status, statusText});
      }
    } else if (type == 'mid') {
      commit(HOSTS_QUERY_DETAIL, {
        "totalSize": "15",
        "rows": [
          {
            "rownum": "1",
            "id": "1281",
            "name": "/usr/sbin/vmtoolsd",
            "user": "root",
            "pm": "4376",
            "vm": "185112",
            "cpu": "0",
            "process": "Sl"
            }, {"rownum": "2",
            "id": "1546",
            "name": "auditd",
            "user": "root",
            "pm": "884",
            "vm": "27636",
            "cpu": "0",
            "process": "S"}
            ,{
            "rownum": "3",
            "id": "1571",
            "name": "/sbin/rsyslogd",
            "user": "root",
            "pm": "2084",
            "vm": "251196",
            "cpu": "0",
            "process": "Sl"
            },{
            "rownum": "4",
            "id": "1589",
            "name": "rpcbind",
            "user": "rpc",
            "pm": "1020",
            "vm": "19036",
            "cpu": "0",
            "process": "Ss"
            },{
            "rownum": "5",
            "id": "2653",
            "name": "/usr/jdk/bin/java",
            "user": "root",
            "pm": "1238632",
            "vm": "6464776",
            "cpu": "0.3",
            "process": "Sl"
            },{
            "rownum": "6",
            "id": "9503",
            "name": "/opt/datadog-agent/embedded/bin/python",
            "user": "root",
            "pm": "25380",
            "vm": "146684",
            "cpu": "0.7",
            "process": "S"
            },{
            "rownum": "7",
            "id": "11755",
            "name": "./yunsuo_agent_service",
            "user": "root",
            "pm": "55180",
            "vm": "4369280",
            "cpu": "0",
            "process": "Sl"
            },{
            "rownum": "8",
            "id": "24638",
            "name": "/usr/sbin/vsftpd",
            "user": "root",
            "pm": "816",
            "vm": "52468",
            "cpu": "0",
            "process": "Ss"
            },{
            "rownum": "9",
            "id": "4581",
            "name": "/usr/bin/gnome-terminal",
            "user": "root",
            "pm": "17492",
            "vm": "8220",
            "cpu": "0",
            "process": "Sl"
            },{
            "rownum": "10",
            "id": "4583",
            "name": "/bin/bash",
            "user": "root",
            "pm": "1992",
            "vm": "108428",
            "cpu": "0",
            "process": "Ss+"
            },{
            "rownum": "11",
            "id": "4412",
            "name": "/usr/libexec/libus-x11",
            "user": "root",
            "pm": "6960",
            "vm": "236036",
            "cpu": "0",
            "process": "S"
            },{
            "rownum": "12",
            "id": "4413",
            "name": "/usr/libexec/ibus-engine-pingyin",
            "user": "root",
            "pm": "4532",
            "vm": "162588",
            "cpu": "0",
            "process": "S"
            },{
            "rownum": "13",
            "id": "4442",
            "name": "/usr/libexec/gvfsd-metadata",
            "user": "root",
            "pm": "2024",
            "vm": "132500",
            "cpu": "0",
            "process": "S"
            },{
            "rownum": "14",
            "id": "4449",
            "name": "/usr/libexec/gvfsd-burn",
            "user": "root",
            "pm": "2464",
            "vm": "134740",
            "cpu": "0",
            "process": "S"
            },{
            "rownum": "15",
            "id": "4582",
            "name": "gnome-pty-helper",
            "user": "root",
            "pm": "716",
            "vm": "8220",
            "cpu": "0",
            "process": "S"
            }
        ]
      })
    } else if (type == 'host') {
      commit(HOSTS_QUERY_DETAIL, {
        "totalSize": "14",
        "rows": [{
          "rownum": "1",
          "id": "22",
          "name": "open",
          "pm": "tcp",
          "vm": "ssh",
          "cpu": "OpenSSH 5.3 (protocol 2.0)",
          "process": "危险",
          "error": "1、OpenSSH 7.4之前的版本中的sshd的共享内存管理器存在安全漏洞。本地攻击者可通过访问沙箱privilege-separation进程利用该漏洞获取权限。2、OpenSSH 7.4之前的版本中的ssh-agent的ssh-agent.c文件存在不可信的搜索路径漏洞。远程攻击者可通过控制转发的agent-socket利用该漏洞执行任意本地PKCS#11模块。3、OpenSSH 7.4之前的版本中的sshd存在安全漏洞。本地攻击者可利用该漏洞获取权限。4、OpenSSH 7.4之前的版本中的sshd的authfile.c文件中存在安全漏洞。本地攻击者可通过访问privilege-separated子进程利用该漏洞获取敏感的私钥信息。"
        },
        {
          "rownum": "2",
          "id": "21",
          "name": "open",
          "pm": "tcp",
          "vm": "ftp",
          "cpu": "vsftpd 2.2.2",
          "process": "危险",
          "error": "vsftpd中存在缓冲区溢出漏洞，该漏洞源于对用户提供的数据未经充分的边界值校验。攻击者可利用该漏洞在应用程序上下文中执行任意代码，攻击失败将会导致拒绝服务。vsftpd 2.3.4版本中存在该漏洞，其他版本也可能受影响。"
        },
        {
        "rownum": "3",
        "id": "80",
        "name": "open",
        "pm": "tcp",
        "vm": "http",
        "cpu": "Apache Tomcat/Coyote JSP engine 1.1",
        "process": "安全",
        "error": ""
        },
        {
        "rownum": "4",
        "id": "111",
        "name": "open",
        "pm": "tcp",
        "vm": "rpcbind",
        "cpu": "2-4 (RPC #100000)",
        "process": "",
        "error": ""
        },
        {
        "rownum": "5",
        "id": "135",
        "name": "filtered",
        "pm": "tcp",
        "vm": "msrpc",
        "cpu": "",
        "process": "",
        "error": ""
        },
        {
        "rownum": "6",
        "id": "137",
        "name": "filtered",
        "pm": "tcp",
        "vm": "netbios-ns",
        "cpu": "",
        "process": "",
        "error": "NETBIOS 名称服务"
        },
        {
        "rownum": "7",
        "id": "138",
        "name": "filtered",
        "pm": "tcp",
        "vm": "netbios-dgm",
        "cpu": "",
        "process": "",
        "error": "NETBIOS 数据报服务"
        },
        {
        "rownum": "8",
        "id": "139",
        "name": "filtered",
        "pm": "tcp",
        "vm": "netbios-ssn",
        "cpu": "",
        "process": "",
        "error": "NETBIOS 会话服务"
        },
        {
        "rownum": "9",
        "id": "445",
        "name": "filtered",
        "pm": "tcp",
        "vm": "microsoft-ds",
        "cpu": "",
        "process": "",
        "error": "通过 TCP/IP 的服务器消息块（SMB）"
        },
        {
        "rownum": "10",
        "id": "5555",
        "name": "open",
        "pm": "tcp",
        "vm": "freeciv?",
        "cpu": "",
        "process": "",
        "error": ""
        },
        {
        "rownum": "11",
        "id": "8009",
        "name": "open",
        "pm": "tcp",
        "vm": "ajp13",
        "cpu": "Apache Jserv (Protocol v1.3)",
        "process": "",
        "error": ""
        },
        {
        "rownum": "12",
        "id": "9077",
        "name": "open",
        "pm": "tcp",
        "vm": "http",
        "cpu": "Apache Tomcat/Coyote JSP engine 1.1",
        "process": "",
        "error": ""
        },
        {
        "rownum": "13",
        "id": "47661",
        "name": "open",
        "pm": "tcp",
        "vm": "status",
        "cpu": "1 (RPC #100024)",
        "process": "",
        "error": ""
        }
        ]
      });
    }
    
  }
}

export default {
  state: initState,
  mutations,
  actions
}