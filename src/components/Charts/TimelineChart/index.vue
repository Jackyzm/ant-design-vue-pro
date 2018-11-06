<template>
    <div class="timelineChart" :style="'height: '+(height+30)+'px'">
        <div>
            <h4 v-if="title">{{ title }}</h4>
            <ve-line :data="chartData" :colors="colors" :settings="chartSettings" :extend="chartExtend" :data-zoom="dataZoom" />
        </div>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import "echarts/lib/component/dataZoom";
export default {
  name: "TimelineChart",
  components: {
    VeLine
  },
  computed: {
    chartData() {
      return {
        columns: this.columns,
        rows: this.data
      };
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        [];
      }
    },
    titleMap: {
      type: Object,
      default: () => {
        {
        }
      }
    },
    height: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array,
      default: () => {
        [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    this.chartSettings = {
      labelMap: this.titleMap
    };
    this.dataZoom = [
      {
        type: "slider",
        start: 0,
        end: 100
      }
    ];
    this.chartExtend = {
      grid: {
        // top: 20,
        // bottom: 10
        right: 50,
        left: 30
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            width: 1,
            type: "dashed",
            opacity: 0.5
          }
        }
      },
      xAxis: {
        show: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ccc"
          }
        },
        axisTick: {
          show: true,
          alignWithLabel: true
        },
        axisLabel: {
          color: "#444"
        },
        boundaryGap: false
      },
      series: {
        symbol: "circle",
        symbolSize: 2,
        showSymbol: false,
        smooth: false
      }
    };
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

