<template>
  <v-content id="title" title="实时查询服务管理">
  <mains :sysTrees='sysTrees'></mains>
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
  computed:{
    ...mapState({
      currentId: state => state.home.currentId,
    })
  },
  mounted() {
    axios.post('/common/catalog/queryTree', 'busiObj', {
      "headers": {
        "content-type": "application/json"
      }
    }).then((res) => {
      console.log(res)
      this.sysTrees = res.data.dataSet.children
    })
  }
 

}



</script>
<style scoped>

</style>
