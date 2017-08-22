<template>
    <div>
        <!-- <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search'></search> -->
        <!--使用button跳转  -->
        <!-- <button class="button" @click="toCreate">新建</button> -->
    
        <div class="background"></div>
        <div class="system">
            <div class="sys_info" v-for="(item,i) in sys" :key="item">
                <img :src="img" alt="">
                <div class="detail">
                    <p class="title">{{item.queryIntfName||item.zcxtzwm ||item.sjdxzwm ||item.mc ||item.scriptNameCn}}</p>
                    <div>
                        <span class="dtitle">描述</span>
                        <span class="desc">{{item.queryIntfDesc||item.zcxtms||item.sjdxms||item.ms||item.scriptDesc}}</span>
                    </div>
                    <div>
                        <span class="dtitle">最后修改时间</span>
                        <span class="desc">{{item.lastModifiedTime||item.zhxgsj ||item.zhxgsj}}</span>
                    </div>
                </div>
                <div class="system-hover">
                    <p>
                        <a :href="watchPath" @click="changeOpObj(item)">查看</a>|
                        <a :href="modifyPath" @click="changeOpObj(item)">修改</a>|
                        <a href="javascript:;" @click="showRemove(i)">删除</a>
                    </p>
                </div>
    
                <div class="delete">
                    <h4>确认删除吗？</h4>
                    <button class="button margin" @click="remove(item,i)">确认</button>
                    <button class="button" @click="closeRemove(i)">取消</button>
                </div>
    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img: require('../../assets/ico1.png'),
            keys: ''
        }
    },
    props: ['sys','modifyPath','watchPath'],
    methods: {
        changeOpObj(val){
            this.$emit('changeOpObj',val)
        },
        showRemove(e) {
            document.getElementsByClassName('background')[0].style.display = 'block';
            document.getElementsByClassName('delete')[e].style.display = 'block';
        },
        closeRemove(e) {
            document.getElementsByClassName('background')[0].style.display = 'none';
            document.getElementsByClassName('delete')[e].style.display = 'none';
        },
        remove(e,i){
            this.$emit('remove',e.wid)
            this.closeRemove(i)
        }
        
    },
    mounted(){console.log('xxxxxxxxx')},
    updated(){
        
        console.log(this.sys)
    }
}
</script>
<style scoped>
.sys_info {
    display: inline-block;
    min-width: 388px;
    width: 45%;
    border: 1px solid #d8dcf0;
    margin-top: 20px;
}

.sys_info:nth-of-type(2n) {
    margin-left: 15px;
    float: right;
}

.sys_info img {
    padding: 20px;
    background-color: #f7f8fd;
    vertical-align: top;
    margin-left: 15px;
    margin-top: 15px;
}

.detail {
    display: inline-block;
    margin-left: 15px;
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

.background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
}

.delete {
    display: none;
    position: absolute;
    width: 200px;
    padding: 50px;
    background-color: #fff;
    left: 40%;
    top: 30%;
    text-align: center;
}


.desc {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.system-hover {
    background-color: #7c88cc;
    color: #fff;
    width: 100%;
    margin-top: 15px;
    height: 25px;
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

.system-hover p a {
    text-decoration: none;
    color: #fff;
    margin: 0 5px;
}

.system-hover p a:hover {
    cursor: pointer;
}
.margin {
    margin-right: 50px;
}
</style>


