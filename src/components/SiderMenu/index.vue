<template>
    <a-layout-sider
        :trigger="null"
        collapsible
        :collapsed="collapsed"
        breakpoint="lg"
        @collapse="onCollapse"
        width="256"
        class="sider"
    >
        <div class="logo" key="logo">
            <a to="/" style="float:left;">
                <img :src="logo" alt="logo" />
                <h1>AntD Vue Pro</h1>
            </a>
        </div>
        <a-menu
            key="Menu"
            theme="dark"
            mode="inline"
            @openChange="handleOpenChange"
            @select="selected"
            :openKeys="openKeys"
            :selectedKeys="selectedKeys"
            style="padding: 16px 0; width: 100%"
        >
            <ThreeMenu :menuData="menuData"/>
        </a-menu>
    </a-layout-sider>
</template>

<script>
import { urlToList } from "../_utils/pathTools";
import cloneDeep from "lodash/cloneDeep";
import ThreeMenu from "./ThreeMenu";

export default {
  name: "SiderMenu",
  components: {
    ThreeMenu
  },
  props: {
    logo: {
      type: String
    },
    collapsed: {
      type: Boolean
    },
    onCollapse: {
      type: Function
    },
    menuData: {
      type: Array
    },
    location: {
      type: Object
    }
  },
  mounted() {
    let pathArr = urlToList(this.location.path);
    if (pathArr[2] && !this.checkPath(pathArr[2])) {
      this.openKeys = [pathArr[0]];
      this.selectedKeys = [pathArr[1]];
      return;
    } else if (pathArr[2]) {
      this.openKeys = [pathArr[0], pathArr[1]];
    } else {
      this.openKeys = [pathArr[0]];
    }
    this.selectedKeys = [this.location.path];
  },
  watch: {
    collapsed: "collapsedChange",
    $route() {
      let pathArr = urlToList(this.location.path);
      if (pathArr[2] && !this.checkPath(pathArr[2])) {
        this.openKeys = [pathArr[0]];
        this.selectedKeys = [pathArr[1]];
        return;
      } else if (pathArr[2]) {
        this.openKeys = [pathArr[0], pathArr[1]];
      } else {
        this.openKeys = [pathArr[0]];
      }
      this.selectedKeys = [this.location.path];
    }
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      status: false
    };
  },
  methods: {
    checkPath(url) {
      let status = false;
      const mapData = data => {
        data.map(item => {
          if (item.path == url) status = true;
          if (item.children) {
            haveChildren(item.children);
          }
        });
      };
      const haveChildren = arr => {
        mapData(arr);
      };
      mapData(this.menuData);
      return status;
    },
    handleOpenChange(openKeys) {
      let keys;
      if (openKeys.length > 1) {
        if (openKeys.length > 2) {
          keys = [openKeys[openKeys.length - 1]];
        } else if (openKeys[1].indexOf(openKeys[0]) > -1) {
          keys = [openKeys[0], openKeys[1]];
        } else {
          keys = [openKeys[openKeys.length - 1]];
        }
        this.openKeys = keys;
      } else {
        this.openKeys = openKeys;
      }
    },
    selected({ item, key, selectedKeys }) {
      this.selectedKeys = selectedKeys;
    },
    collapsedChange(val, oldVal) {
      if (val) {
        this.openKeys = [];
      } else {
        let pathArr = urlToList(this.location.path);
        if (pathArr[2]) {
          this.openKeys = [pathArr[0], pathArr[1]];
        } else {
          this.openKeys = [pathArr[0]];
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
@import "~ant-design-vue/lib/style/themes/default.less";
.drawer .drawer-content {
  background: #001529;
}
.ant-menu-inline-collapsed {
  & > .ant-menu-item .sider-menu-item-img + span,
  &
    > .ant-menu-item-group
    > .ant-menu-item-group-list
    > .ant-menu-item
    .sider-menu-item-img
    + span,
  & > .ant-menu-submenu > .ant-menu-submenu-title .sider-menu-item-img + span {
    max-width: 0;
    display: inline-block;
    opacity: 0;
  }
}
.ant-menu-item .sider-menu-item-img + span,
.ant-menu-submenu-title .sider-menu-item-img + span {
  transition: opacity 0.3s @ease-in-out, width 0.3s @ease-in-out;
  opacity: 1;
}
</style>
