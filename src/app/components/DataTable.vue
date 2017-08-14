<template>
  <div class="data-table">
    <loading :load="loading" />
    <div class="data-table-rows">
      <table>
        <colgroup>
          <col 
            v-for="col in columns" 
            v-if="!col.hidden"
            :style="{maxWidth: getWidth(col.width), width: getWidth(col.width)}"
          />
        </colgroup>
        <tr>
          <th 
            v-for="col in columns" 
            v-if="!col.hidden"
            :style="{textAlign: col.align, maxWidth: getWidth(col.width), width: getWidth(col.width)}"
            :key="col.key">{{col.title}}</th>
        </tr>
        <tr
          v-for="(row, idx) in rows"
          @click="itemClick(row, idx)"
          :key="'datatablerow'+idx">
          <td
            v-for="(col,i) in columns"
            v-if="!col.hidden"
            :style="{textAlign: col.align, maxWidth: getWidth(col.width), width: getWidth(col.width)}"
            :key="'datatablecell' + idx + i" v-html="renderCell(col.render, row[col.key], row, idx)">
          </td>
        </tr>
      </table>
    </div>
    <div class="nodata" v-if="rows == 'undefined' || rows.length == 0">
        <span v-if="!loading">没有数据</span>
    </div>
    <page 
      v-if="totalSize > 10"
      :totalSize="totalSize" 
      @pageChange="pageChange"
      />
  </div>
</template>

<script>
/**
 * 已知bug:
 *  由于overflow-x 造成 该组件形成bfc, 当数据量小的时候, 下拉框会被截掉
 */
import memoize from 'fast-memoize';
import Loading from './Loading';
import Page from './Page';

export default {
  components: {
    Loading,
    Page
  },
  props: {
    columns: Array,
    rows: Array,
    loading: Boolean,
    totalSize: Number
  },
  computed: {
  },
  methods: {
    getWidth: memoize(function(w) {
      const type = typeof w;
      if (type === 'number') {
        return `${w}px`;
      } else if (type === 'undefined') {
        return 'auto';
      } else {
        return w;
      }
    }),
    renderCell: function(funcOrStr, cell, row, index) {
      const isFunc = typeof funcOrStr === 'function';
      if (isFunc) {
        const result = funcOrStr(cell, row);
        if (result === undefined || result === null) {
          return '';
        } else {
          return result.toString();
        }
      } else {
        return cell && cell.toString();
      }
    },
    pageChange(page, size) {
      this.$emit('pageChange', page, size);
    },
    itemClick(row, idx) {
      this.$emit('click', row, idx);
    }
  }
}
</script>