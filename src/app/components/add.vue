<template>
    <div id="add">
        <!-- <loading :load="loading" /> -->
        <form>
            <div class="form-group">
                <label class="lWidth">注册系统名</label>
                <input class="iWidth" type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">数据库类型</label>
                <select class="iWidth">
                    <option>opt1</option>
                </select>
            </div>
    
            <div class="form-group">
                <label class="lWidth">数据库连接字符串</label>
                <input class="iWidth" type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">数据库连接用户名</label>
                <input class="iWidth" type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">数据库对线所有者</label>
                <input class="iWidth" type="text">
            </div>
        </form>
        <div class="form-group">
            <label class="lWidth"></label>
            <button class="test">连接测试</button>
            <button class="save">保存</button>
            <button class="cancel">取消</button>
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
        <!--vue-validator  -->
        <validator name="validation">
            <form novalidate>
                <div class="username-field">
                    <label for="username">username:</label>
                    <input type="text" id="username" v-validate:username="['required']" />
                </div>
                <div class="comment-filed">
                    <label for="comment">comment:</label>
                    <input type="text" id="comment" v-validate:comment="{maxlength: 256}" />
                </div>
                <div class="errors">
                    <!-- <p v-if="$validation.username.required">请输入你的名字</p> -->
                    <p v-if="$validation.comment.maxlength">您的评论太长了</p>
                </div>
                <input type="submit" value="send" v-if="$validation.valid" />
            </form>
        </validator>
    </div>
</template>

<script>
import Vue from 'Vue'
import Loading from './Loading';
import VueValidator from 'vue-validator';
Vue.use(VueValidator);
export default {
    data() {
        return {
            loading: true,
            isConnected: true
        }
    },
    components: {
        Loading
    }
}
</script>

<style scoped>
#add {
    position: relative;
}

button {
    border: none;
    color: #fff;
    box-shadow: 1px 1px 2px gray;
    width: 80px;
    height: 30px;
}

.test {
    background-color: #60be29;
}

.save {
    background-color: #2196f3;
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
