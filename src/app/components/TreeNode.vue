<template>
    <div id="list-box">
    
        <ul>
            <li class="sysTree" v-for="item in sysTrees">
                <div class="liBg" @click="showChildrenTree($event);changeID(item.id)">
                    <i v-show="item.children!=null" class="fa fa-caret-right fa-lg"></i>
                    {{item.name}}
                </div>
                <ul v-if="item.children!=null" class="cul" v-show="isShow">
                    <li v-for="item2 in item.children">
                        <div class="liBg" @click="showChildrenTree($event);changeID(item2.id)">
                            <i v-show="item2.children!=null" class="fa fa-caret-right fa-lg"></i>
                            {{item2.name}}
                        </div>
    
                        <ul v-if="item.children!=null" class="cul" v-show="isShow">
                            <li v-for="item3 in item2.children" @click="askForSys;changeID(item3.id)">
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
            var list = document.getElementsByClassName('active');
            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove('active')
            }
            console.log(e.target.parentNode.parentNode.getElementsByTagName('ul')[0])
            if (e.target.tagName == 'I') {
                e.target.parentNode.classList.add('active')
                var childN = e.target.parentNode.parentNode.getElementsByTagName('ul')[0]
                if (childN.style.display == 'block') {
                    childN.style.display = 'none';
                    e.target.className = 'fa fa-caret-right fa-lg'
                } else {
                    childN.style.display = 'block';
                    e.target.className = 'fa fa-caret-down fa-lg'
                }
            } else {
                e.target.classList.add('active')
                var childN = e.target.parentNode.getElementsByTagName('ul')[0]
                if (childN.style.display == 'block') {
                    childN.style.display = 'none';
                    e.target.getElementsByTagName('I')[0].className = 'fa fa-caret-right fa-lg'
                } else {
                    childN.style.display = 'block';
                    e.target.getElementsByTagName('I')[0].className = 'fa fa-caret-down fa-lg'
                }
            }

        },
        askForSys() {
            axios.post()
        },
        changeID(id) {
            console.log('xxx')
            this.$emit('changeID', id)
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

li {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 10px 0;
}
.cul {
    text-indent: 2em;
}
.cul .cul{
    text-indent: 4em;
}


.liBg {
    padding: 5px 0;
    z-index: 111;
}

.liBg:hover {
    cursor: pointer;
    background-color: #eee
}

li .active,
.active:hover {
    background-color: #595cec;
    color: #fff;
}
.fa{
    display: inline;
}
</style>

