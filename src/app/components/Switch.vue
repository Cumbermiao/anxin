<template>
    <span role="switch"  @click="toggle">
        <span class="switch-on" v-show="checked">
            <span v-if="!hasText">{{onText}}</span>
        </span>
        <span class="switch-off" v-show="!checked">
            <span v-if="!hasText">{{offText}}</span>
        </span>
    </span>
</template>

<script>
export default {
    props:['size','onText','offText','onColor','offColor','hasText','checked'],
    data() {
        return {
            c: this.checked
        }
    },
    methods:{
        toggle(){
            if(!this.isDisabled){
                this.c = !this.c;
                this.activeStyle = this.c?this.switchOn:this.switchOff;
            }
            this.$emit('change',this.c)
        }
    },
    computed: {
        switchWrapper() {
            return [
                'xg-switch',
                {
                    [`switch-${this.size}`]: !!this.size,
                    'switch-disabled': !!this.isDisabled,
                    'swithOn': this.checked
                }
            ]
        },
        switchOn() {
            return {
                backgroundColor: this.onColor,
                borderColor: this.onColor
            }
        },
        switchOff(){
            return {
                backgroundColor: this.onColor,
                borderColor: this.onColor
            }
        },
        activeStyle(){
            if(this.isDisabled){
                return this.switchDisabled;
            }else if(this.checked){
                return this.swithOn
            }else{
                return this.switchOff
            }
        }
    }
}
</script>

<style scoped>
.xg-switch{
    display: inline-block;
    position: relative;
    width: 44px;
    height: 24px;
    border-width: 1px;
    border-style: solid;
    border-radius: 24px;
    line-height: 22px;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.xg-switch:after{
    content: '';
    width: 20px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: 1px;
    bottom: 1px;
    cursor: pointer;
}

.switch-on{
    position: absolute;
    font-size: 12px;
    color: #fff;
    left: 6px;
}
.switch-on:after{
    width: 16px;
}
.switch-off{
    position: absolute;
    font-size: 12px;
    color: #fff;
    right: 6px;
}
.switch-off{
    width: 16px;
}
</style>
