<template>
  <v-content id="title" title="实时查询服务管理">
    <!--getBandingClientReact 获取当前元素距离父元素得值  -->
    <div class="home_content">
      <section>
        <search-input placeholder="请输入对象分了名称关键词搜索"></search-input>
        <m-button @click.native="search">新建</m-button>
  
        <!-- <ul>
              <li class="sysTree" v-for="item3 in sysTrees">
                <div class="liBg" @click="showChildrenTree($event)">
                  <i v-show="item3.children!=null" class="fa fa-caret-right fa-lg"></i>
                  {{item3.name}}
                </div>
                <ul v-if="item3.children!=null" class="cul" v-show="isShow">
                  <li v-for="item4 in item3.children">
                    <div class="liBg" @click="showChildrenTree($event)">
                      <i v-show="item4.children!=null" class="fa fa-caret-right fa-lg"></i>
                      {{item4.name}}
                    </div>
      
                    <ul v-if="item3.children!=null" class="cul" v-show="isShow">
                      <li v-for="item5 in item4.children">
                        <div class="liBg">
                          <i v-show="item5.children!=null" class="fa fa-caret-right fa-lg"></i>
                          {{item3.name}}
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>  -->
        <tree-node :sysTrees='sysTrees'></tree-node>
  
      </section>
      <section>
        <search placeholder="请输入对象分了名称关键词搜索"></search>
        <m-button @click.native="search">新建</m-button>
  
        <div class="system" @mouseover="showHover">
          <div class="sys_info" v-for="item in sys">
            <img :src="item.img" alt="">
            <div class="detail">
              <p class="title">{{item.title}}</p>
              <div v-for="item2 in item.details">
                <span class="dtitle">{{item2.dtitle}}</span>
                <span class="desc">{{item2.desc}}</span>
              </div>
              <div v-if="item.isUsed">
                <span class="dtitle">是否启用</span>
                <switch-b></switch-b>
              </div>
            </div>
  
            <div class="system-hover">
              <p>
                <span>查看</span>|
                <span>修改</span>|
                <span>删除</span>
              </p>
            </div>
          </div>
  
        </div>
        <pages :select='select'></pages>
      </section>
  
    </div>
    <!-- <create></create> -->
    <!-- <page v-if="totalSize > 10" :totalSize="totalSize" @pageChange="pageChange" /> -->
    </div>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { home } from '../../constants';
import Button from '../../components/Button';
// import Switch from '../../components/Switch';
import SwitchB from '../../components/SwitchB'
import Content from '../../components/Content.vue';
import WaterBall from '../../components/WaterBall.vue';
// import FontIcon from '../../components/FontIcon.vue';
// import NumberView from '../../components/NumberView.vue';
import Search from '../../components/Search'
import SearchInput from '../../components/SearchInput.vue';
import Pages from '../../components/Pages';
import axios from '../../utils/axios';
import TreeNode from '../../components/TreeNode';
// import IconItem from '../../components/IconItem.vue';
// import DataTable from '../../components/DataTable';
export default {
  components: {
    vContent: Content,
    SearchInput,
    Search,
    mButton: Button,
    SwitchB,
    Pages,
    TreeNode,
  },
  data() {
    return {
      isShow: false,
      select: [20, 40, 60],
      sysTrees: [
        {
          name: '1',
          children: [{
            name: '2',
            children: [{
              name: '3'
            }]
          }]
        }
      ],
      sys: [{
        img: require('../../../assets/ico1.png'),
        title: '用户终端信息',
        isUsed: true,
        details: [
          { dtitle: '描述', desc: '这里是一段描述，只显示...' },
          { dtitle: '最后修改时间', desc: '2017-02-21 14:49:30' }
        ]
      }, {
        img: require('../../../assets/ico1.png'),
        title: '用户终端信息',
        details: [
          { dtitle: '描述', desc: '这里是一段描述，只显示...' },
          { dtitle: '最后修改时间', desc: '2017-02-21 14:49:30' }
        ]
      }, {
        img: require('../../../assets/ico1.png'),
        title: '用户终端信息',
        details: [
          { dtitle: '描述', desc: '这里是一段描述，只显示...' },
          { dtitle: '最后修改时间', desc: '2017-02-21 14:49:30' }
        ]
      }, {
        img: require('../../../assets/ico1.png'),
        title: '用户终端信息',
        details: [
          { dtitle: '描述', desc: '这里是一段描述，只显示ddd' },
          { dtitle: '最后修改时间', desc: '2017-02-21 14:49:30' }
        ]
      }],
      onColor: '#333',
      offColor: '#999',
      checked: true
    }
  },
  methods: {
    search() {
    },
    showHover() {

    },
    showChildrenTree(e) {
      console.log(e.target)
      console.log(e.target.parentNode)
      var childN = e.target.parentNode.getElementsByTagName('ul')[0]
      console.log(childN)

      if (childN.style.display == 'block') {
        childN.style.display = 'none';
        e.target.getElementsByTagName('i')[0].className = 'fa fa-caret-right fa-lg'
      } else {
        childN.style.display = 'block';
        e.target.getElementsByTagName('i')[0].className = 'fa fa-caret-down fa-lg'
      }
      e.target.className = 'liBg active'
    }



  },
  mounted() {
    axios.post('/data-open-web/common/catalog/queryTree', 'busiObj', {
      "headers": {
        "content-type": "application/json"
      }
    }).then((res) => {
      console.log(res)
      // this.sysTrees = res.data
      // this.sysTrees = res.data.dataSet.children
      console.log(this.sysTrees)
    })
  }
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
