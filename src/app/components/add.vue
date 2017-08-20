<template>
    <div id="add">
        <!-- <loading :load="loading" /> -->
        <form>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 注册系统中文名</label>
                <input class="inWidth" required type="text" v-model="zcxtzwm" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 注册系统英文名</label>
                <input class="inWidth" required type="text" v-model="zcxtywm" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span>数据库类型</label>
                <select v-if="!opObj" class="inWidth" required v-model="sjklx" @change="changeLX($event)" >
                    <option v-for="item in select" :key="item" :value="item.dataValue" v-text="item.dataName"></option>
                </select>
                <select v-else class="inWidth" :disabled='readonly'>
                    <option >{{sjkqdlx}}</option>
                </select>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 数据库驱动</label>
                <input class="inWidth" required v-model="sjkqd" type="text" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 数据库连接字符串</label>
                <input class="inWidth" required type="text" v-model="sjkljzfc" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 数据库连接用户名</label>
                <input class="inWidth" required type="text" v-model="sjkljyhm" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 数据库连接用户密码</label>
                <input class="inWidth" required type="text" v-model="sjkljyhmm" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 数据库对象所有者</label>
                <input class="inWidth" required type="text" v-model="sjkdxsyz" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 最后修改人</label>
                <input class="inWidth" disabled required type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">
                    <span class="required">*</span> 最后修改时间</label>
                <input class="inWidth" disabled required type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">注册系统描述
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" required rows="6" :readonly='readonly' required></textarea>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate" v-show="isShow"> 必填</span>
                </div>
            </div>
    
        </form>
         <div class="form-group">
                <label class="lWidth"></label>
                <button class="test" @click="test">连接测试</button>
                <button class="save" v-show="!readonly" @click="save">保存</button>
                <button class="cancel" v-show="!readonly" @click="cancel">取消</button>
            </div>
    
        <div class="background" v-if="loading">
            <div class="success result" v-if="isConnected">
                <span>
                    <i class="fa fa-check-circle fa-lg"></i>连接成功
                    <i class="close fa fa-close" @click="loading=!loading"></i>
                </span>
            </div>
            <div class="fail result" v-if="!isConnected">
                <span>
                    <i class="fa fa-info-circle fa-lg"></i>连接失败
                    <i class="close fa fa-close"></i>
                </span>
            </div>
            <!--sometimes the thing you are searching for your whole life , its right there by your side all along  -->
        </div>
    </div>
</template>

<script>

import Loading from './Loading';
import { mapState } from 'vuex';
import router from '../../route'
export default {
    data() {
        return {
            isShow: false,
            loading: false,
            isConnected: false,
            sjkdxsyz: '',
            sjkfwm: '',
            sjkljyhm: '',
            sjkljyhmm: '',
            sjkljzfc: '',
            sjkqd: '',
            sjkqdlx: '',
            sjklx: '',
            wid: '',
            zcxtms: '',
            zcxtywm: '',
            zcxtzwm: ''
        }
    },
    props: ['select', 'readonly', 'opObj'],
    components: {
        Loading
    },
    computed: {
        ...mapState({
            testRes: state => state.ds.testRes,
        })
    },
    methods: {
        changeLX(e) {
            if (this.sjklx == 'oracle') {
                this.sjkqd = 'oracle.jdbc.driver.OracleDriver';
                this.sjkljzfc = 'jdbc:oracle:thin:@127.0.0.1:1521:dbname';
            } else if (this.sjklx == 'postgresql') {
                this.sjkqd = 'org.postgresql.Driver';
                this.sjkljzfc = 'jdbc:postgresql://127.0.0.1:3306/mydb';
            } else if (this.sjklx == 'mySql') {
                this.sjkqd = 'com.mysql.jdbc.Driver';
                this.sjkljzfc = 'jdbc:mysql://127.0.0.1:3306/mydb';
            }
        },

        test() {
            var val = {
                connStr: this.sjkljzfc,
                driverClass: this.sjkqd,
                pwd: this.sjkljyhmm,
                userName: this.sjkljyhm
            }
            this.$emit('test', val)

        },
        save() {
            var val = {
                sjkdxsyz: this.sjkdxsyz,
                sjkfwm: this.sjkfwm,
                sjkljyhm: this.sjkljyhm,
                sjkljyhmm: this.sjkljyhmm,
                sjkljzfc: this.sjkljzfc,
                sjkqd: this.sjkqd,
                sjkqdlx: this.sjkqdlx,
                sjklx: this.sjklx,
                wid: this.wid,
                zcxtms: this.zcxtms,
                zcxtywm: this.zcxtywm,
                zcxtzwm: this.zcxtzwm
            }
            this.$emit('save', val)
            this.loading = true;
            if (this.testRes == true) {
                this.loading = false;
                this.isConnected = true;
            } else {
                this.loading = false;
                this.isConnected = false;
            }
        },
        cancel() {
            router.go(-1)
        }
    },
    mounted() {
        console.log("this.opObj")
        console.log(this.opObj)
        if (this.opObj) {
            this.sjkdxsyz = this.opObj.sjkdxsyz,
                this.sjkfwm = this.opObj.sjkfwm,
                this.sjkljyhm = this.opObj.sjkljyhm,
                this.sjkljyhmm = this.opObj.sjkljyhmm,
                this.sjkljzfc = this.opObj.sjkljzfc,
                this.sjkqd = this.opObj.sjkqd,
                this.sjkqdlx = this.opObj.sjkqdlx,
                this.sjklx = this.opObj.sjklx,
                this.wid = this.opObj.wid,
                this.zcxtms = this.opObj.zcxtms,
                this.zcxtywm = this.opObj.zcxtywm,
                this.zcxtzwm = this.opObj.zcxtzwm
        }
    }
}
</script>

<style scoped>
.required {
    position: absolute;
    left: -5px;
    color: red;
}

#add {
    position: relative;
}

button {
    border: none;
    color: #fff;
    box-shadow: 1px 1px 2px gray;
    width: 80px;
    height: 30px;
    cursor: pointer;
}

.test {
    background-color: #60be29;
}

.save {
    background-color: #2196f3;
    margin: 0 20px;
}

.cancel {
    background-color: #fff;
    color: #000;
}

.background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
}

.result {
    /* display: inline-block; */
    padding: 20px 0;
    width: 200px;
    background-color: #fff;
    position: absolute;
    top: 45%;
    left: 45%;
    text-align: center;
}

.success i {
    color: #60be29;
    margin-right: 10px;
}

.fail i {
    color: #ff9a04;
    margin: 0 10px;
}

i.close {
    color: #333;
    float: right;
}

.close:hover {
    cursor: pointer;
}
</style>
