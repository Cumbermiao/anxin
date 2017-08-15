<template>
    <span ref="switch" class="switch" @click="toggle">
        <span ref="switchBtn" class="switch-btn"></span>
        <span class="text closed" v-show="!isOpen">否</span>
        <span class="text open" v-show="isOpen">是</span>
    </span>
</template>

<script>
export default {
    props: ['hasText'],
    data() {
        return {
            isOpen: false,
            onText: '否'
        }
    },
    methods: {
        toggle() {
            if (!this.isOpen) {
                this.$refs.switchBtn.style.left = '19px';
                this.$refs.switch.style.background = '#4ec207';
                this.isOpen = !this.isOpen;
            } else {
                this.$refs.switchBtn.style.left = '1px';
                this.$refs.switch.style.background = '#f1f1f9';
                this.isOpen = !this.isOpen;
            }


        }
    }
}
</script>

<style scoped>
.custom-move-active-class {
    right: 1px;
    transition: all 0.618s;
}

.switch {
    display: inline-block;
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 24px;
    line-height: 22px;
    vertical-align: middle;
    cursor: pointer;
    background-color: #f1f1f9;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.switch-btn {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    left: 1px;
    top: 0;
    box-shadow: -1px 1px 1px gray;
}

.text {
    position: absolute;
    right: -30px;
}

.closed {
    color:#999
}
.open{
    color: #4ec207
}
</style>
