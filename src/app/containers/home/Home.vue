<template>
  <v-content id="title" title="实时查询服务管理">
  <mains :sysTrees='sysTrees'></mains>
    </div>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import { home } from '../../constants';
import Content from '../../components/Content.vue';
import axios from '../../utils/axios';
import Mains from '../../components/Mains'
export default {
  components: {
    Mains,
    vContent: Content,
  },
  data() {
    return {
      sysTrees:[]
    }
  },
  mounted() {
    axios.post('/data-open-web/common/catalog/queryTree', 'busiObj', {
      "headers": {
        "content-type": "application/json"
      }
    }).then((res) => {
      console.log(res)
      this.sysTrees = res.data.dataSet.children
      console.log(this.sysTrees)
    })
  },

}



</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}


li {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
}

.cul {
  padding-left: 40px;
}

.liBg {
  padding: 5px 0;
}

.liBg:hover {
  cursor: pointer;
  background-color: #eee
}


.home_content {
  border: 1px solid #d8dcf0;
}

.home_content section:first-child {
  float: left;
  padding: 15px;
  height: 100%;
}

.home_content section:last-child {
  overflow: hidden;
  padding: 15px;
  border-left: 1px solid #d8dcf0;
}

.sys_info {
  display: inline-block;
  height: 151px;
  width: 45%;
  border: 1px solid #d8dcf0;
  padding: 15px;
  margin: 15px 0;
  position: relative;
}

.sys_info:nth-of-type(2n) {
  margin-left: 15px;
  float: right;
}

.sys_info img {
  padding: 20px;
  background-color: #f7f8fd;
  float: left;
  vertical-align: top;
}

.detail {
  /* display: inline-block; */
  margin-left: 15px;
  overflow: hidden;
}

.title {
  font-size: 16px;
  font-weight: 700;
}

.dtitle {
  color: #999;
  font-size: 12px;
  display: inline-block;
  width: 120px;
}

.desc {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.system-hover {
  background-color: #7c88cc;
  color: #fff;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px 0;
  padding-right: 10px;
  box-sizing: border-box;
  /* display: none; */
  opacity: 0;
  transition-duration: 0.618s;
}

.system-hover:hover {
  opacity: 1
}

.system-hover p {
  float: right;
  margin: 0;
}

.system-hover p span {
  margin: 0 5px;
}

.system-hover p span:hover {
  cursor: pointer;
}
</style>
