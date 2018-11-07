<template>
    <div :class="cls" :style="styles">
        <div v-if="title" class="label">
            <span>{{ title }}</span>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
  name: "StandardFormRow",
  mounted() {
    this.cls = `standardFormRow ${this.block ? "standardFormRowBlock" : ""} ${
      this.last ? "standardFormRowLast" : ""
    } ${this.grid ? "standardFormRowGrid" : ""}`;
  },
  props: {
    title: {
      type: String
    },
    block: {
      type: Boolean
    },
    last: {
      type: Boolean
    },
    grid: {
      type: Boolean
    },
    styles: {
      type: String
    }
  },
  data() {
    return {
      cls: ""
    };
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
