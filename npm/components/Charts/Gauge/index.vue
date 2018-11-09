<template>
    <div>
        <ve-gauge :data="chartData" :settings="chartSettings" :background-color="bgColor" :height="height+'px'" :extend="chartExtend" />
    </div>
</template>

<script>
import { colors } from "../index";
import VeGauge from "v-charts/lib/gauge.common";
export default {
  name: "Gauge",
  components: {
    VeGauge
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "%"
    },
    color: {
      type: String,
      default: "#1890FF"
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    percent: {
      type: Number,
      default: 0
    },
    gaugeStyle: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  computed: {
    chartData() {
      return {
        columns: ["type", "value"],
        rows: [{ type: "percent", value: this.percent }]
      };
    }
  },
  data() {
    this.chartSettings = {};
    this.chartExtend = {
      tooltip: { show: false },
      series: {
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          lineStyle: {
            // 属性lineStyle控制线条样式
            width: 10,
            color: [
              [(this.percent - this.min) / (this.max - this.min), this.color],
              [1, "#ddd"]
            ]
          }
        },
        splitLine: {
          show: true,
          length: 14,
          lineStyle: {
            color: "auto"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true
        },
        pointer: {
          length: "50%",
          width: 5
        },
        itemStyle: {
          color: this.color
        },
        radius: "90%",
        splitNumber: 4,
        detail: {
          formatter: [
            `{a|${this.title}}`,
            `{b|${this.percent}${this.format}}`
          ].join("\n"),
          rich: {
            a: {
              color: "#999",
              fontSize: 14,
              padding: [10, 0, 70, 0]
            },
            b: {
              color: "#000",
              fontSize: 24
            }
          }
        }
      }
    };
    return {
      colors
    };
  }
};
</script>

