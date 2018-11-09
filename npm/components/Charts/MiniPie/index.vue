<template>
    <div :class="pieClassName" :style="pieStyle">
        <div class="chart">
            <ve-ring :data="chartData" :height="height+'px'" :colors="colors" :extend="chartExtend" />
            <div v-if="subTitle || total" class="total">
                <h4 v-if="subTitle" class="pie-sub-title">{{ subTitle }}</h4>
                <p v-if="total" class="pie-stat">{{ total }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import VeRing from "v-charts/lib/ring.common";

export default {
  name: "MiniPie",
  components: {
    VeRing
  },
  mounted() {},
  computed: {
    pieClassName() {
      return `pie ${this.className} ${!!this.hasLegend ? "hasLegend" : ""} ${
        this.legendBlock ? "legendBlock" : ""
      }`;
    },
    chartData() {
      return {
        columns: ["x", "y"],
        rows: [{ x: "x", y: this.percent }, { x: "x1", y: 100 - this.percent }]
      };
    },
    colors() {
      return [this.color ? this.color : "#1890FF", "#ccc"];
    }
  },
  props: {
    className: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    pieStyle: {
      type: String,
      default: ""
    },
    percent: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    subTitle: {
      type: String,
      default: ""
    },
    total: {
      type: String,
      default: ""
    },
    radius: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  methods: {},
  data() {
    this.chartExtend = {
      grid: {},
      legend: {
        show: false
      },
      tooltip: {
        show: false
      },
      series: {
        label: {
          show: false
        },
        radius: this.radius,
        hoverAnimation: false,
        center: ["50%", "50%"],
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2
        }
      }
    };
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "../Pie/index.less";
</style>

