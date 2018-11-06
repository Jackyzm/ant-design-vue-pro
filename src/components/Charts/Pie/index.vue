<template>
    <div :class="pieClassName" :style="pieStyle">
        <div class="chart">
            <ve-ring :data="chartData" :height="height+'px'" :colors="colors" :extend="chartExtend" />
            <div v-if="subTitle || total" class="total">
                <h4 v-if="subTitle" class="pie-sub-title">{{ subTitle }}</h4>
                <p v-if="total" class="pie-stat">{{ total }}</p>
            </div>
        </div>

        <ul v-if="hasLegend" class="legend">
            <li v-for="(item, i) in legendData" :key="item.x" @click="handleLegendClick(item, i)">
                <span
                    class="dot"
                    :style="'background-color: '+ (!item.checked ? '#aaa' : item.color) "
                />
                <span class="legendTitle">{{ item.x }}</span>
                <a-divider type="vertical" />
                <span class="percent">
                    {{ `${(isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%` }}
                </span>
                <span class="value">{{ valueFormat ? valueFormat(item.y) : item.y }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import VeRing from "v-charts/lib/ring.common";
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Pie",
  components: {
    VeRing
  },
  mounted() {
    this.setChartData();
    this.setLegendData();
  },
  computed: {
    pieClassName() {
      return `pie ${this.className} ${!!this.hasLegend ? "hasLegend" : ""} ${
        this.legendBlock ? "legendBlock" : ""
      }`;
    }
    // chartData: {
    //   get: function() {
    //     return {
    //       columns: ["x", "y"],
    //       rows: cloneDeep(this.data)
    //     };
    //   },
    //   set: function(index) {
    //     if (this.legendData[index].checked) {
    //       this.chartDataArr.rows[index].y = this.data[index].y;
    //     } else {
    //       this.chartDataArr.rows[index].y = 0;
    //     }
    //   }
    // },
    // legendData: {
    //   get: function() {
    //     if (this.data.length == 0) return [];
    //     let arr = cloneDeep(this.data);
    //     const total = arr.reduce((pre, now) => now.y + pre, 0);
    //     return arr.map((item, index) => {
    //       item.checked = true;
    //       item.color = this.colors[index];
    //       item.percent = item.y / total;
    //       return item;
    //     });
    //   },
    //   set: function(index) {
    //     this.legendDataArr[index].checked = !this.legendDataArr[index].checked;
    //   }
    // }
  },
  watch: {
    // eslint-disable-next-line
    data: function(val, oldVal) {
      this.setChartData();
      this.setLegendData();
    }
  },
  props: {
    className: {
      type: String,
      default: ""
    },
    colors: {
      type: Array
    },
    valueFormat: {
      type: Function,
      default: () => {}
    },
    hasLegend: {
      type: Boolean,
      default: false
    },
    legendBlock: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        [];
      }
    },
    pieStyle: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    total: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleLegendClick(item, index) {
      let checkedItem = 0;
      this.legendData.map(val => {
        if (val.checked) checkedItem += 1;
      });
      if (checkedItem > 2 || item.checked == false) {
        if (!this.legendData[index].checked) {
          this.chartData.rows[index].y = this.data[index].y;
        } else {
          this.chartData.rows[index].y = 0;
        }
        this.legendData[index].checked = !this.legendData[index].checked;
      } else {
        return;
      }
    },
    setChartData() {
      this.chartData = {
        columns: ["x", "y"],
        rows: cloneDeep(this.data)
      };
    },
    setLegendData() {
      if (this.data.length == 0) return [];
      const arr = cloneDeep(this.data);
      const total = arr.reduce((pre, now) => now.y + pre, 0);
      this.legendData = arr.map((item, index) => {
        item.checked = true;
        item.color = this.colors[index];
        item.percent = item.y / total;
        return item;
      });
    }
  },
  data() {
    this.chartExtend = {
      grid: {},
      legend: {
        show: false
      },
      tooltip: {
        // eslint-disable-next-line
        formatter: function(params, ticket, callback) {
          return `${params.marker} ${params.name}: ${params.value}`;
        }
      },
      series: {
        label: {
          show: false
        },
        radius: ["76%", "100%"],
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 4
        }
      }
    };
    return {
      chartData: {},
      legendData: []
    };
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

