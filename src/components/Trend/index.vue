<template>
    <div :style="trendStyle" :class="'trendItem ' + (!colorful ? 'trendItemGrey':' ') + (reverseColor && colorful? 'reverseColor': ' ') + className ">
        <slot name="number"></slot>
        <span v-if="flag" :class="flag">
          <a-icon :type="'caret-'+flag" />
        </span>
    </div>
</template>

<script>
export default {
  name: "Trend",
  props: {
    colorful: {
      type: Boolean,
      default: true
    },
    reverseColor: {
      type: Boolean,
      default: false
    },
    flag: {
      type: String
    },
    trendStyle: {
      type: String
    },
    className: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>

