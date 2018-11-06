<template>
    <div class='field' :style="fieldStyle">
        <span>{{ label }}</span>
        <span>{{ value }}</span>
    </div>
</template>

<script>
export default {
  name: "Field",
  props: {
    label: {
      type: String
    },
    value: {
      type: String
    },
    fieldStyle: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
