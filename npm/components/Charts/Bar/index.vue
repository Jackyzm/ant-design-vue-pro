<template>
    <div class="chart" :style="'height:'+height+'px;'">
        <div>
            <h4 v-if="title" style="margin-bottom: 20px;">{{ title }}</h4>
            <ve-histogram height="254px" :legend-visible="false" :colors="[color]" :data="chartData" :extend="chartExtend"></ve-histogram>
        </div>
    </div>
</template>

<script>
import VeHistogram from "v-charts/lib/histogram.common";
export default {
  name: "Bar",
  components: {
    VeHistogram
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "#1890FF"
    },
    data: {
      type: Array
    }
  },
  computed: {
    chartData() {
      return {
        columns: ["x", "y"],
        rows: this.data
      };
    }
  },
  data() {
    this.chartExtend = {
      grid: {
        top: 20,
        bottom: 10
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
        }
      },
      tooltip: {
        // eslint-disable-next-line
        formatter: function(params, ticket, callback) {
          return `${params[0].marker} ${params[0].axisValue}: ${
            params[0].value
          }`;
        }
      },
      series: {
        barMaxWidth: "50%"
      }
    };
    return {};
  }
};
</script>

<style lang="less" scoped>
</style>
