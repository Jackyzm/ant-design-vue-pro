<template>
    <div class='miniChart' :style="height">
        <div class="chartContent">
            <ve-line :data="chartData" :legend-visible="false" :settings="chartSettings" :colors="['#975FE4']" height="100px" :extend="chartExtend"></ve-line>
        </div>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
export default {
  name: "MiniArea",
  components: {
    VeLine
  },
  props: {
    height: {
      type: String,
      default: "height: 46px;"
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
  created() {},
  data() {
    this.chartSettings = {
      area: true
    };
    this.chartExtend = {
      grid: {
        right:0,
        top: 10,
        bottom:55,
        left: 0,
      },
      yAxis: {
        show: false,
        axisLabel:{
            show:false,
        }
      },
      xAxis: {
        show: false,
        axisLabel:{
            show:false
        }
      },
      tooltip:{
        formatter: function (params, ticket, callback) {
            return `${params[0].marker} ${params[0].axisValue}: ${params[0].value[1]}`;
        }
      },
      series: {
          symbol: 'circle',
          symbolSize: 2,
          showSymbol: false
      }
    };
    return {};
  }
};
</script>

<style lang="less" scoped>
</style>
