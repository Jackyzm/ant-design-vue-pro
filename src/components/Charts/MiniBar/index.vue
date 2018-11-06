<template>
    <div class='miniChart' :style="height">
        <div class="chartContent">
            <ve-histogram :data="chartData" :legend-visible="false" height="100px" :colors="[color]" :extend="chartExtend"></ve-histogram>
        </div>
    </div>
</template>

<script>
import VeHistogram from "v-charts/lib/histogram.common";
export default {
  name: "MiniBar",
  components: {
    VeHistogram
  },
  props: {
    height: {
      type: String,
      default: "height: 46px;"
    },
    data: {
      type: Array
    },
    color: {
      type: String,
      default: "#1890FF"
    },
    forceFit: {
      type: Boolean,
      default: true
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
  created() {},
  data() {
    this.chartExtend = {
      grid: {
        right: 0,
        top: 10,
        bottom: 55,
        left: 0
      },
      yAxis: {
        show: false,
        axisLabel: {
          show: false
        }
      },
      xAxis: {
        show: false,
        axisLabel: {
          show: false
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
