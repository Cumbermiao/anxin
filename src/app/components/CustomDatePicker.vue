<template>
  <div class="select-wrap custom-datepicker">
    <span class="label">{{label}}</span>
    <div class="select" :style="{width: size + 'em'}" tabindex="-1">
      <div class="select-selectbox">
        <i class="select-prev" @click="prev"></i>
        <div 
          @click="toggle"
          :disabled="disabled"
          onselectstart="return false"
          tabindex="-1">
          <div class="select-selectbox-inner">
            {{startText}}-{{endText}}
          </div>
          <i class="select-selectbox-icon"></i>
        </div>
        <i class="select-next" @click="next"></i>
      </div>
      <div
        ref="dropdown"
        v-show="show"
        :style="{
          top: top
        }"
        class="select-dropdown" 
        tabindex="-1">
        <tab-navi
          @click="tabChange"
          :not-link="true"
          :items="tabs" />
        <div class="select-content" v-if="this.tab == 0">
          <v-select 
            class="custom-select"
            @change="selectChange"
            :auto-fire="true"
            :defaut-active="defaultTime"
            :items="customDropdownItem"
            :size="4"
            />
          <date-picker class="inner-date-picker" :default-date="start" @select="startSelect" />
          -
          <date-picker class="inner-date-picker" :default-date="end" @select="endSelect" />
          <v-button @click.native="click">
            确定
          </v-button>
        </div>
        <div class="select-content second-select" v-if="this.tab == 1">
          <div class="select-selectbox">
            <i class="select-prev" @click="yearPrev"></i>
            <div 
              @click="toggle"
              :disabled="disabled"
              onselectstart="return false"
              tabindex="-1">
              <div class="select-selectbox-inner">
                {{year + '年'}}
              </div>
            </div>
            <i class="select-next" @click="yearNext"></i>
          </div>
          <div class="select-month">
            <span
             v-for="m in 12"
             @click="monthSelect(m)"
             :class="{active: month == m}">{{m}}月</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TabNavi from './TabNavi.vue';
import Select from './Select.vue';
import DatePicker from './DatePicker.vue';
import Button from './Button.vue';
export default {
  components: {
    TabNavi,
    vSelect: Select,
    DatePicker,
    vButton: Button
  },
  props: {
    label: String,
    disabled: Boolean,
    up: Boolean,
    autoFire: {
      type: Boolean,
      default: true
    },
    size: Number,
    defaultTime: {
      type: Number,
      default: 11
    }
  },
  data() {
    const date = new Date();
    return {
      show: false,
      top: 0,
      tab: 0,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      start: date,
      end: date
    }
  },
  computed: {
    startText() {
      const date = new Date(this.start);
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${date.getFullYear()}年${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日`;
    },
    endText() {
      const date = new Date(this.end);
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${date.getFullYear()}年${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日`;
    },
    tabs() {
      return [{
        title: "自定义选择",
        id: 0
      }, {
        title: "按月选择",
        id: 1
      }]
    },
    customDropdownItem() {
      return [{
        text: '全部',
        id: -1
      },{
        text: '今天',
        id: 0
      }, {
        text: '本周',
        id: 1
      }, {
        text: '上周',
        id: 2
      }, {
        text: '本月',
        id: 3
      }, {
        text: '上月',
        id: 4
      }, {
        text: '本季度',
        id: 5
      }, {
        text: '上季度',
        id: 6
      }, {
        text: '今年',
        id: 7
      }, {
        text: '去年',
        id: 8
      }, {
        text: '近7天',
        id: 9
      }, {
        text: '近30天',
        id: 10
      }]
    }
  },
  mounted() {
    if (this.autoFire) {
      this.$emit('change', this.start, this.end);
    }
    // 计算下拉框大小, 进行定位
    if (this.up) {
      let totalHeight = 0;
      const dom = this.$refs.dropdown;
      const prev = dom.style.display;
      dom.style.display = 'block';
      totalHeight = dom.clientHeight;
      dom.style.display = prev;
      this.top = -2 - totalHeight + 'px';
    } else {
      this.top = '25px';
    }
  },
  methods: {
    toggle() {
      if (this.disabled) {
        return;
      }
      this.show = !this.show;
      if (this.show) {
        // hack !!!
        this.$nextTick(() => this.$refs.dropdown.focus());
      }
    },
    hide() {
      this.show = false;
    },
    tabChange(tab, idx) {
      this.tab = tab.id
    },
    prev() {
      const date = this.start;
      this.start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      this.end = new Date(date.getFullYear(), date.getMonth(), 0);
      this.$emit('change', this.start, this.end);
    },
    next() {
      const date = this.start;
      this.start = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      this.end = new Date(date.getFullYear(), date.getMonth() + 2, 0);
      this.$emit('change', this.start, this.end);
    },
    yearPrev() {
      this.year--;
      this.start = new Date(this.year, this.month - 1, 1);
      this.end = new Date(this.year, this.month, 0);
      this.$emit('change', this.start, this.end);
    },
    yearNext() {
      this.year++;
      this.start = new Date(this.year, this.month - 1, 1);
      this.end = new Date(this.year, this.month, 0);
      this.$emit('change', this.start, this.end);
    },
    click() {
      this.$emit('change', this.start, this.end);
      this.hide();
    },
    monthSelect(month) {
      this.month = month;
      this.start = new Date(this.year, this.month - 1, 1);
      this.end = new Date(this.year, this.month, 0);
      this.click();
    },
    startSelect(value, showText) {
      this.start = value;
      this.startText = showText;
    },
    endSelect(value, showText) {
      this.end = value;
      this.endText = showText;
    },
    selectChange(item, idx) {
      const id = item.id;
      const date = new Date();
      if (id === 0) { // 今天
        this.start = date;
        this.end = date;
      } else if (id === 1) {
        //本周
        const startDate = date.getDate() - date.getDay();
        this.start = new Date(date.getFullYear(), date.getMonth(), startDate);
        const endDate = startDate + 6;
        this.end = new Date(date.getFullYear(), date.getMonth(), endDate);
      } else if (id === 2) {
        // 上周
        const startDate = date.getDate() - date.getDay() - 7;
        this.start = new Date(date.getFullYear(), date.getMonth(), startDate);
        const endDate = startDate + 6;
        this.end = new Date(date.getFullYear(), date.getMonth(), endDate);
      } else if (id === 3) {
        // 本月
        this.start = new Date(date.getFullYear(), date.getMonth(), 1);
        this.end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      } else if (id === 4) {
        // 上月
        this.start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        this.end = new Date(date.getFullYear(), date.getMonth(), 0);
      } else if (id === 5) {
        // 本季度
        const current = date.getMonth() % 4 + 1;
        const startMonth = (current - 1) * 3 + 1;
        const endMonth = current * 3;
        this.start = new Date(date.getFullYear(), startMonth - 1, 1);
        this.end = new Date(date.getFullYear(), endMonth, 0);
      } else if (id === 6) {
        // 上季度
        const current = date.getMonth() % 4 + 1;
        const prev = current === 1 ? 4 : current - 1;
        const startMonth = (prev - 1) * 3 + 1;
        const endMonth = prev * 3;
        this.start = new Date(date.getFullYear(), startMonth - 1, 1);
        this.end = new Date(date.getFullYear(), endMonth, 0);
      } else if (id === 7) {
        // 今年
        this.start = new Date(date.getFullYear(), 0, 1);
        this.end = new Date(date.getFullYear(), 11, 31);
      } else if (id === 8) {
        // 去年
        this.start = new Date(date.getFullYear() - 1, 0, 1);
        this.end = new Date(date.getFullYear() - 1, 11, 31);
      } else if (id === 9) {
        // 近7天
        this.start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        this.end = date;
      } else if (id === 10) {
        // 近30天
        this.start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
        this.end = date;
      }
    }
  }
}
</script>