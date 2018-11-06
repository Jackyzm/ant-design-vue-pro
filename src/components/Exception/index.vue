<template>
    <div :class="`exception ${className}`" :style="exceptionStyle">
        <div class="imgBlock">
            <div class="imgEle" :style="`background-image: url(${img || config[pageType].img})`" />
        </div>
        <div class="content">
            <h1>{{ title || config[pageType].title }}</h1>
            <slot name="title" />
            <div class="desc">{{ desc || config[pageType].desc }}</div>
            <slot name="desc" />
            <div class="actions">
                <router-link to="/">
                    <a-button type="primary">返回首页</a-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import config from "./typeConfig";
export default {
  name: "Exception",
  props: {
    type: {
      type: String
    },
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
    exceptionStyle: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      config,
      pageType: this.type in config ? this.type : "404"
    };
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
