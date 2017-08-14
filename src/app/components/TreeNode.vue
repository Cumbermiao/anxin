<template>
    <div id="list-box">
        <!-- <ul v-if='children.children==null' class="cul" v-show="isShow">
                        <li v-for="item in children">
                            <div class="active liBg" @click="askForSys($event)" :id="item.id" :open='item.open'>
                                {{item.name}}
                            </div>
                        </li>
                    </ul>
                    <ul v-else class="cul" v-show="isShow">
                        <li v-for="item in children">
                            <div class="liBg" @click="showChildrenTree($event)" :id="item.id" :open='item.open'>
                                <i v-show="item.children!=null" class="fa fa-caret-right fa-lg"></i>
                                {{item.name}}
                            </div> -->
    
        <!-- <ul v-if="item.children!=null" class="cul" v-show="isShow">
                                <li v-for="item2 in item.children">
                                    <div class="liBg" @click="showChildrenTree($event)" :id="item2.id" :open='item2.open'>
                                        <i v-show="item2.children!=null" class="fa fa-caret-right fa-lg"></i>
                                        {{item2.name}}
                                    </div>
                                </li>
                            </ul> -->
        <!-- </li> -->
    
        <ul>
            <li class="sysTree" v-for="item in sysTrees">
                <div class="liBg" @click="showChildrenTree($event);hover($event)">
                    <i v-show="item.children!=null" class="fa fa-caret-right fa-lg"></i>
                    {{item.name}}
                </div>
                <ul v-if="item.children!=null" class="cul" v-show="isShow">
                    <li v-for="item2 in item.children">
                        <div class="liBg" @click="showChildrenTree($event);hover($event)">
                            <i v-show="item2.children!=null" class="fa fa-caret-right fa-lg"></i>
                            {{item2.name}}
                        </div>
    
                        <ul v-if="item.children!=null" class="cul" v-show="isShow">
                            <li v-for="item3 in item2.children" @click="askForSys">
                                <div class="liBg" @click="hover($event)">
                                    <i v-show="item3.children!=null" class="fa fa-caret-right fa-lg"></i>
                                    {{item3.name}}
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- <div class="indicator"></div> -->
    
    </div>
</template>

<script>
import axios from '../utils/axios'
export default {
    props: ['sysTrees'],
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        showChildrenTree(e) {
            console.log(e.target)
            var childN = e.target.parentNode.getElementsByTagName('ul')[0]
            if (childN.style.display == 'block') {
                childN.style.display = 'none';
                e.target.getElementsByTagName('i')[0].className = 'fa fa-caret-right fa-lg'
            } else {
                childN.style.display = 'block';
                e.target.getElementsByTagName('i')[0].className = 'fa fa-caret-down fa-lg'
            }
        },
        askForSys() {
            axios.post()
        },
        hover(e) {
            // var top = e.target.getBoundingClientRect().top
            // console.log(e)
            // console.log(top)
            // var indicator = document.querySelector('.indicator')

            // indicator.style.position = 'absolute'

            // indicator.style.top = top + 'px';

            // indicator.style.left = 0;

        }
    },
    mounted() {
        // console.log(this.children)
    }

}
</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}

#list-box {
    position: relative;
    left: 0;
    top: 0;
}

.indicator {
    width: 100%;
    height: 28px;
    background-color: rgba(0, 0, 255, 0.5);
    position: absolute;
    top:0;
    left: 0;
    z-index: 0;
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
    z-index: 111;
}

.liBg:hover {
    cursor: pointer;
    background-color: #eee
}
</style>

