<template>
    <div :class="clsString" :style="descriptionListStyle">
        <div v-if="title" class="title">{{ title }}</div>
        <a-row :gutter="gutter">
            <a-col v-for="item in list" :class="`description ${className}`" :key="item.term" v-bind="responsive[column]">
                <div class="term">{{ item.term }}</div>
                <div class="detail">{{ item.text }}</div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import responsive from "./responsive";
export default {
  name: "DescriptionList",
  props: {
    layout: {
      type: String,
      default: "horizontal"
    },
    className: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    col: {
      type: Number,
      default: 3
    },
    gutter: {
      type: Number,
      default: 32
    },
    size: {
      type: String,
      default: ""
    },
    descriptionListStyle: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  computed: {
    clsString() {
      return `descriptionList ${this.layout} ${this.className} ${
        this.size === "small" ? "small" : ""
      } ${this.size === "large" ? "large" : ""}`;
    }
  },
  data() {
    const column = this.col > 4 ? 4 : this.col;
    return {
      column,
      responsive
    };
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
