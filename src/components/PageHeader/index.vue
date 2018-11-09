<template>
    <div :class="`pageHeader ${className}`">
        <a-breadcrumb v-if="breadcrumbList && breadcrumbList.length" class="breadcrumb" :separator="breadcrumbSeparator">
            <a-breadcrumb-item v-for="item in breadcrumbList" :key="item.title">
                <router-link :href="item.href">{{ item.title }}</router-link>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-breadcrumb
            v-if="routes && params"
          class="breadcrumb"
          :routes="routes.filter(route => route.breadcrumbName)"
          :params="params"
          :separator="breadcrumbSeparator"
        >
            <template slot="itemRender" slot-scope="{route, params, routes, paths}"><!-- eslint-disable-line -->
                <span v-if="routes.indexOf(route) === routes.length - 1 || !route.component">{{ route.breadcrumbName }}</span>
                <router-link v-else to="/">{{ route.breadcrumbName }}</router-link>
            </template>
        </a-breadcrumb>
        <a-breadcrumb v-if="routerLocation && routerLocation.path" class="breadcrumb" :separator="breadcrumbSeparator">
            <a-breadcrumb-item key="home">
                <router-link to="/">首页</router-link>
            </a-breadcrumb-item>
            <template v-for="(url, index) in pathSnippets">
                <a-breadcrumb-item v-if="getBreadcrumb(url).name && !getBreadcrumb(url).hideInBreadcrumb" :key="url">
                    <span v-if="index !== pathSnippets.length - 1 && getBreadcrumb(url).component">{{ getBreadcrumb(url).name }}</span>
                    <router-link v-else :to="url">{{ getBreadcrumb(url).name }}</router-link>
                </a-breadcrumb-item>
            </template>
        </a-breadcrumb>
        <div class="detail">
            <div v-if="logo || $slots.logo" class="logo">
                {{ logo }}
                <slot name="logo" />
            </div>
            <div class="main">
                <div class="row">
                    <h1 v-if="title || $slots.title" class="title">
                        {{ title }}
                        <slot name="title" />
                    </h1>
                    <div v-if="action || $slots.action" class="action">
                        {{ action }}
                        <slot name="action" />
                    </div>
                </div>
                <div class="row" v-if="$slots.content || $slots.extraContent">
                    <div class="content">
                        <slot name="content" />
                    </div>
                    <div class="extraContent">
                        <slot name="extraContent" />
                    </div>
                </div>
            </div>
        </div>
        <a-tabs
            v-if="tabList && tabList.length"
            class="tabs"
            v-bind="activeKeyProps"
            @change="onChange"
        >
            <template slot="tabBarExtraContent">
                <slot name="tabBarExtraContent" />
            </template>
            <a-tab-pane v-for="item in tabList" :tab="item.tab" :key="item.key" />
        </a-tabs>
    </div>
</template>

<script>
import { urlToList } from "../_utils/pathTools";
import pathToRegexp from "path-to-regexp";
export default {
  name: "PageHeader",
  components: {},
  props: {
    className: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: ""
    },
    onTabChange: {
      type: Function,
      default: () => {}
    },
    tabActiveKey: {
      type: String,
      default: ""
    },
    tabDefaultActiveKey: {
      type: String,
      default: ""
    },
    routes: {
      type: Array,
      default: () => {
        [];
      }
    },
    router: {
      type: Object
    },
    getMenuData: {
      type: Function
    },
    tabList: {
      type: Array,
      default: () => {
        [];
      }
    },
    breadcrumbList: {
      type: Array,
      default: () => {
        [];
      }
    },
    params: {}, // eslint-disable-line
    breadcrumbSeparator: {}, // eslint-disable-line
    routerLocation: {
      type: Object
    },
    breadcrumbNameMap: {
      type: Object
    }
    // breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
    // tabList?: Array<{ key: string; tab: React.ReactNode }>;
  },
  mounted() {
    this.menuData = this.getMenuData();
  },
  computed: {
    activeKeyProps() {
      const obj = {};
      if (this.tabDefaultActiveKey !== undefined) {
        obj.defaultActiveKey = this.tabDefaultActiveKey;
      }
      if (this.tabActiveKey !== undefined) {
        obj.activeKey = this.tabActiveKey;
      }
      return obj;
    },
    pathSnippets() {
      if (this.routerLocation) {
        return urlToList(this.routerLocation.path);
      } else {
        return [];
      }
    }
  },
  created() {
    const routerData = {};
    const mapArr = function(arr) {
      arr.map(item => {
        if (item.path == "*") return;
        if (item.children) {
          mapArr(item.children);
        }
        routerData[`${item.path}`] = {
          component: item.component
        };
        if (item.name) {
          routerData[`${item.path}`].name = item.name;
        }
      });
    };
    mapArr(this.router.options.routes);
    this.routerData = routerData;
  },
  data() {
    return {
      menuData: []
    };
  },
  methods: {
    onChange(key) {
      if (this.onTabChange) {
        this.onTabChange(key);
      }
    },
    getBreadcrumb(url) {
      const breadcrumbNameMap =
        this.breadcrumbNameMap || this.getBreadcrumbNameMap(this.menuData);
      let breadcrumb = breadcrumbNameMap[url];
      if (!breadcrumb) {
        Object.keys(breadcrumbNameMap).forEach(item => {
          if (pathToRegexp(item).test(url)) {
            breadcrumb = breadcrumbNameMap[item];
          }
        });
      }
      return breadcrumb || {};
    },
    /**
     * 获取面包屑映射
     * @param {Object} menuData 菜单配置
     * @param {Object} routerData 路由配置
     */
    getBreadcrumbNameMap(menuData) {
      const result = {};
      const mapArr = function(data) {
        data.map(item => {
          if (item.children) {
            mapArr(item.children);
          }
          result[item.path] = item;
        });
      };
      mapArr(menuData);

      return Object.assign({}, this.routerData, result);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
