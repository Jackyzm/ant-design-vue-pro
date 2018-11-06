<template>
    <div class="activeChart">
        <NumberInfo subTitle="目标评估" total="有望达到预期" />
        <div style="margin-top: 32px;">
          <MiniArea :height="84" :data="activeData" />
        </div>
        <div v-if="activeData" class="activeChartGrid">
            <!-- <p>{{[...activeData].sort()[activeData.length - 1].y + 200}} 亿元</p> -->
            <!-- <p>{{[...activeData].sort()[Math.floor(activeData.length / 2)].y}} 亿元</p> -->
            <p>{{ y1 }}</p>
            <p>{{ y2 }}</p>
        </div>
        <div v-if="activeData" class="activeChartLegend">
            <span>00:00</span>
            <!-- <span>{{activeData[Math.floor(activeData.length / 2)].x}}</span> -->
            <!-- <span>{{activeData[activeData.length - 1].x}}</span> -->
            <span>{{ x1 }}</span>
            <span>{{ x2 }}</span>
        </div>
      </div>
</template>

<script>
import { MiniArea } from "../Charts";
import NumberInfo from "../NumberInfo";

export default {
  name: "ActiveChart",
  components: {
    MiniArea,
    NumberInfo
  },
  props: {},
  mounted() {
    const activeData = this.getActiveData();
    this.activeData = activeData;
    this.x1 = activeData[Math.floor(activeData.length / 2)].x;
    this.x2 = activeData[activeData.length - 1].x;
    this.y1 = `${[...activeData].sort()[activeData.length - 1].y + 200} 亿元`;
    this.y2 = `${[...activeData].sort()[Math.floor(activeData.length / 2)].y} 亿元`;
    this.timer = setInterval(() => {
      const activeData = this.getActiveData();
      this.activeData = activeData;
      this.y1 = `${[...activeData].sort()[activeData.length - 1].y + 200} 亿元`;
      this.y2 = `${[...activeData].sort()[Math.floor(activeData.length / 2)].y} 亿元`;
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  data() {
    return {
      activeData: [],
      x1: "",
      x2: "",
      y1: "",
      y2: ""
    };
  },
  methods: {
    getActiveData() {
      const activeData = [];
      for (let i = 0; i < 24; i += 1) {
        activeData.push({
          x: `${this.fixedZero(i)}:00`,
          y: Math.floor(Math.random() * 200) + i * 50
        });
      }
      return activeData;
    },
    fixedZero(val) {
      return val * 1 < 10 ? `0${val}` : val;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
