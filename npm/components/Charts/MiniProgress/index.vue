<template>
    <div class="miniProgress">
        <Tooltip :title="'目标值: '+target+'%'">
            <div class="target" :style="'left: '+target+'%'">
                <span :style="'background-color: '+ color" />
                <span :style="'background-color: '+ color" />
            </div>
        </Tooltip>
        <div class="progressWrap">
            <div class="progress" :style="'background-color: ' + color + '; width: ' + percent+'%;height: ' + strokeWidth"></div>
        </div>
    </div>
</template>

<script>
import { Tooltip } from "ant-design-vue";
export default {
  name: "MiniProgress",
  components: {
    Tooltip
  },
  props: {
    target: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ""
    },
    strokeWidth: {
      type: String,
      default: ""
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

