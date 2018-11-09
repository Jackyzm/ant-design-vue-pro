<template>
    <div :class="`toolbar ${className}`">
        <div class="left">
            <slot name="extra" />
        </div>
        <div class="right">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
  name: "FooterToolbar",
  props: {
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
