<template>
    <div style="margin: -24px -24px 0;" :class="wrapperClassName">
        <slot name="top" />
        <PageHeader key="pageheader" :routerLocation="$route" :title="title" :tabActiveKey="tabActiveKey" :tabList="tabList" :onTabChange="onTabChange" :getMenuData="getMenuData" :router="router">
            <template slot="logo">
                <slot name="logo" />
            </template>
            <template slot="extraContent">
                <slot name="extraContent" />
            </template>
            <template slot="content">
                <slot name="content" />
            </template>
            <template slot="action">
                <slot name="action" />
            </template>
        </PageHeader>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import router from "@/router";
import { getMenuData } from "@/layouts/menu";
export default {
  name: "PageHeaderLayout",
  components: {
    PageHeader
  },
  props: {
    wrapperClassName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    tabActiveKey: {
      type: String,
      default: ""
    },
    tabList: {
      type: Array
    },
    onTabChange: {
      type: Function
    }
  },
  data() {
    return {
      router,
      getMenuData
    };
  }
};
</script>

<style lang="less" scoped>
@import "./PageHeaderLayout.less";
</style>
