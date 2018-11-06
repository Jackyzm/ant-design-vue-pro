<template>
    <div>
        <ve-wordcloud :data="chartData" :tooltip-visible="false" :height="`${height}px`" :settings="chartSettings" />
    </div>
</template>

<script>
import VeWordcloud from "v-charts/lib/wordcloud.common";
import { colors } from "../index";
export default {
  name: "TagCloud",
  components: {
    VeWordcloud
  },
  props: {
    data: {
      type: Array,
      default: () => {
        [];
      }
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    chartData() {
      return {
        columns: ["name", "value"],
        rows: this.data
      };
    }
  },
  data() {
    this.chartSettings = {
      color: colors,
      shape: "pentagon",
      sizeMin: 12,
      sizeMax: 14
    };
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
