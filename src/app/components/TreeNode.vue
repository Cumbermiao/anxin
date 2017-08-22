<template>

    
    <!-- <ul>
        <li class="sysTree" v-for="item in sysTrees">
            <div class="liBg" @click="showChildrenTree($event);changeID(item.id)">
                <i v-show="item.children!=null" class="fa fa-caret-right fa-lg"></i>
                {{item.name}}
            </div>
            <ul v-if="item.children!=null" class="cul" v-show="isShow">
                <li v-for="item2 in item.children">
                    <div class="liBg" @click="showChildrenTree($event);changeID(item2.id);askForInfo(item2.children)">
                        <i v-show="item2.children!=null" class="fa fa-caret-right fa-lg"></i>
                        {{item2.name}}
                    </div>
    
                    <ul v-if="item.children!=null" class="cul" v-show="isShow">
                        <li v-for="item3 in item2.children" @click="askForInfo(item3.children);changeID(item3.id)">
                            <div class="liBg">
                                <i v-show="item3.children!=null" class="fa fa-caret-right fa-lg"></i>
                                {{item3.name}}
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul> -->
    
     <ul :style="{textIndent:indent+'em'}">
            <li v-for="item in sysTrees" :key="item">
                <div class="liBg" @click="showChildrenTree($event);changeID(item.id);askForInfo(item.children)">
                    <i v-show="item.children!=null" class="fa fa-caret-right fa-lg"></i>
                    {{item.name}}
                </div>
        
                <tree-node @search="askForInfo" style="display:none" @changeID="changeID" v-if="item.children && item.children.length>0" :indent='indent+2' :sysTrees='item.children'></tree-node>
            </li>
        </ul> 
    

</template>

<script>
import { mapState } from 'vuex'
import axios from '../utils/axios'
export default {
    name: 'treeNode',
    props: ['sysTrees', 'options', 'indent', 'sType'],
    data() {
        return {
            isShow: false,
            searchType: "searchForBO"
        }
    },
    methods: {
        showChildrenTree(e) {
            console.log("e.target")
            console.log(this.sType)
            console.log(e.target)
            var list = document.getElementsByClassName('actives');
            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove('actives')
            }
            // this.isShow=!this.isShow;
            console.log(e.target.parentNode.parentNode.getElementsByTagName('ul')[0])
            if (e.target.tagName == 'I') {
                e.target.parentNode.classList.add('actives')
                var childN = e.target.parentNode.parentNode.getElementsByTagName('ul')[0]
                console.log("childN")
                console.log(childN)
                if (childN) {
                    if (childN && childN.style.display == 'block') {
                        childN.style.display = 'none';
                        e.target.className = 'fa fa-caret-right fa-lg'
                    } else {
                        childN.style.display = 'block';
                        e.target.className = 'fa fa-caret-down fa-lg'
                    }
                }

            } else {
                e.target.classList.add('actives')
                var childN = e.target.parentNode.getElementsByTagName('ul')[0]
                console.log('childN')
                console.log(childN)
                if (childN) {
                    if (childN.style.display == 'block') {
                        childN.style.display = 'none';
                        e.target.getElementsByTagName('I')[0].className = 'fa fa-caret-right fa-lg'
                    } else {
                        childN.style.display = 'block';
                        e.target.getElementsByTagName('I')[0].className = 'fa fa-caret-down fa-lg'
                    }
                }

            }
        },
        askForInfo(param) {
            console.log('param')
            console.log(param)
            // console.log(this.searchType)
            if (param == null) {
                // this.$store.dispatch(this.searchType)
                this.$emit('search')
            }

        },
        changeID(id) {
            // alert('changeID')
            console.log('xxx')
            this.$emit('changeID', id)
        }
    },
    mounted() {
        console.log('this.sysTrees')
        console.log(this.sysTrees)
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

.liBg {
    padding: 5px 0;
}

.liBg:hover {
    cursor: pointer;
    background-color: #eee
}

li .actives,
.actives:hover {
    background-color: #595cec;
    color: #fff;
}

.fa {
    display: inline;
}
</style>

