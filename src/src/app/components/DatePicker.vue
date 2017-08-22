<template>
  <div class="select-wrap datepicker">
    <span class="label">{{label}}</span>
    <div class="select" :style="{width: size + 'em'}" tabindex="-1">
      <div class="select-selectbox">
        <div 
          @click="toggle"
          :disabled="disabled"
          onselectstart="return false"
          tabindex="-1">
          <div class="select-selectbox-inner">
            {{showText}}
          </div>
          <i class="select-selectbox-icon"></i>
        </div>
      </div>
      <div
        ref="dropdown"
        v-show="show"
        @blur="hide"
        :style="{
          top: top
        }"
        class="select-dropdown" 
        tabindex="-1">
        <table class="calendar" cellspacing="0" summary="日历">
          <caption>
            <span href="#" @click="prevMonth" rel="prev">&lt;</span>
              {{captionText}}
            <span href="#" @click="nextMonth" rel="next">&gt;</span>
          </caption>
          <tr>
            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
          </tr>
          <tr v-for="row in 6">
            <td v-for="col in 7" 
              @click="dateSelect(calendar[(row-1) * 7 + col - 1])"
              :class="{
                outdate: calendar[(row-1) * 7 + col - 1].month !== month, 
                active: calendar[(row-1) * 7 + col - 1].month === month && date.getDate() == calendar[(row-1) * 7 + col - 1].date}">
              {{calendar[(row-1) * 7 + col - 1].date}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// FIXME: 时间问题, 写的很烂, 后期优化!
import TabNavi from './TabNavi.vue';
import Select from './Select.vue';
export default {
  components: {
    TabNavi,
    vSelect: Select
  },
  props: {
    label: String,
    disabled: Boolean,
    up: Boolean,
    size: Number,
    defaultDate: [String, Date]
  },
  data() {
    let date = null;
    if (typeof this.defaultDate === 'string') {
      date = new Date(this.defaultDate);
    } else if (typeof this.defaultDate === 'object' && this.defaultDate != null
       && Object.prototype.toString.call(this.defaultDate) === '[object Date]') {
      date = this.defaultDate;
    } else {
      date = new Date();
    }
    return {
      show: false,
      top: 0,
      date: date
    }
  },
  watch: {
    defaultDate(nDate) {
      if (typeof nDate === 'string') {
        this.date = new Date(nDate);
      } else if (typeof nDate === 'object' && nDate != null
        && Object.prototype.toString.call(nDate) === '[object Date]') {
        this.date = nDate;
      } else {
        this.date = new Date();
      }
    }
  },
  computed: {
    showText() {
      const m = this.month + 1;
      const d = this.date.getDate();
      return `${this.year}年${m < 10 ? "0" + m : m}月${d < 10 ? "0" + d : d}日`;
    },
    valueStr() {
      const m = this.month + 1;
      const d = this.date.getDate();
      return `${this.year}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    },
    captionText() {
      return `${this.year}年${this.month + 1}月`;
    },
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
    currentFirstDay() {
      return new Date(this.year, this.month, 1).getDay();
    },
    currentLastDate() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    prevFirstDate() {
      return this.prevLastDate - this.currentFirstDay + 1;
    },
    prevLastDate() {
      return new Date(this.year, this.month + 2, 0).getDate();
    },
    calendar() {
      const dates = [];
      const prevMonth = this.month - 1;
      const currentMonth = this.month;
      for(let i = this.prevFirstDate, len = this.prevLastDate; i <= len; i++) {
        dates.push({
          month: prevMonth,
          date: i
        });
      }
      for(let i = 1, len = this.currentLastDate; i <= len; i++) {
        dates.push({
          month: currentMonth,
          date: i
        });
      }
      const left = 42 - dates.length; // 42是一页的总数
      for(let i = 1; i <= left; i++) {
        dates.push({
          month: this.month + 1,
          date: i
        });
      }
      return dates;
    },
  },
  mounted() {
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
      this.top = '30px';
    }
  },
  // created() {
  //   this.$emit('select', this.valueStr, this.showText, this.date);
  // },
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
    prevMonth() {
      this.date = new Date(this.year, this.month - 1, 1);
    },
    nextMonth() {
      this.date = new Date(this.year, this.month + 1, 1);
    },
    dateSelect(date) {
      this.date = new Date(this.year, date.month, date.date);
      this.hide();
      this.$emit('select', this.valueStr, this.showText, this.date);
    }
  }
}
</script>