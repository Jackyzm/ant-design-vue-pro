<template>
    <div class="radar" :style="`height: ${height}px;`">
        <h4>
            {{ title }}
            <slot name="title" />
        </h4>
        <ve-radar :data="chartData" :radar="radar" :extend="chartExtend" />
        <a-row v-if="hasLegend" class="legend">
            <a-col v-for="(item, i) in legendData" :span="24 / legendData.length" :key="item.name" @click="() => this.handleLegendClick(item, i)">
                <div class="legendItem">
                    <p>
                        <span class="dot" :style="`background-color: ${!item.checked ? '#aaa' : item.color};`" />
                        <span>{{ item.name }}</span>
                    </p>
                    <h6>{{ item.value }}</h6>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import VeRadar from "v-charts/lib/radar.common";
export default {
  name: "Radar",
  components: {
    VeRadar
  },
  props: {
    hasLegend: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => {
        [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        [];
      }
    },
    max: {
      type: Number,
      default: 15
    }
  },
  computed: {
    legendData() {
      return [];
    },
    chartData() {
      return {
        columns: this.columns,
        rows: this.data
      };
    }
  },
  data() {
    (this.radar = {
      shape: "polygon",
      indicator: [
        { name: "引用", max: this.max },
        { name: "口碑", max: this.max },
        { name: "产量", max: this.max },
        { name: "贡献", max: this.max },
        { name: "热度", max: this.max }
      ]
    }),
      (this.chartExtend = {
        series: {}
      });
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

