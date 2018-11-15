<template>
    <div class="header">
        <Icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggle"
        />
        <div class="right">
          <HeaderSearch
            class='action search'
            placeholder="站内搜索"
            :dataSource="['搜索提示一', '搜索提示二', '搜索提示三']"
            :onSearch="(value) => onSearch(value)"
            :onPressEnter="(value) => onPressEnter(value)"
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              class="action"
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
            <NoticeIcon
                className="action"
                :count="currentUser.notifyCount"
                :onItemClick="(item, tabProps) => onItemClick(item, tabProps)"
                :onClear="onNoticeClear"
                :onPopupVisibleChange="onNoticeVisibleChange"
                :loading="fetchingNotices"
                :popupAlign="{ offset: [20, -16] }"
                :notices="notices"
            />

            <Dropdown v-if="currentUser.name">
                <Menu slot="overlay" class="menu" @click="onMenuClick">
                    <MenuItem disabled>
                        <Icon type="user" />个人中心
                    </MenuItem>
                    <MenuItem disabled>
                        <Icon type="setting" />设置
                    </MenuItem>
                    <MenuItem key="triggerError">
                        <Icon type="close-circle" />触发报错
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem key="logout">
                        <Icon type="logout" />退出登录
                    </MenuItem>
                </Menu>
                <span class='action account'>
                    <Avatar size="small" class="avatar" :src="currentUser.avatar" />
                    <span class="name">{{ currentUser.name }}</span>
                </span>
            </Dropdown>
            <Spin v-else size="small" style="margin-left: 8px" />
        </div>
    </div>
</template>

<script>
import HeaderSearch from "../HeaderSearch";
import NoticeIcon from "../NoticeIcon";
import { Icon, Tooltip, Dropdown, Menu, Avatar, Spin } from "ant-design-vue";
export default {
  name: "GlobalHeader",
  components: {
    HeaderSearch,
    NoticeIcon,
    Icon,
    Tooltip,
    Dropdown,
    Menu, // eslint-disable-line
    MenuItem: Menu.Item, // eslint-disable-line
    MenuDivider: Menu.Divider,
    Avatar,
    Spin
  },
  props: {
    currentUser: {
      type: Object
    },
    collapsed: {
      type: Boolean
    },
    onCollapse: {
      type: Function
    },
    onNoticeVisibleChange: {
      type: Function
    },
    onNoticeClear: {
      type: Function
    },
    fetchingNotices: {
      type: Boolean
    },
    notices: {
      type: Array
    },
    onMenuClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    toggle() {
      this.onCollapse(!this.collapsed);
    },
    onSearch(value) {
      console.log("input", value);
    },
    onPressEnter(value) {
      console.log("enter", value);
    },
    onItemClick(item, tabProps) {
      console.log(item, tabProps);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.ant-layout {
  min-height: 100vh;
  overflow-x: hidden;
}
.menu {
  .anticon {
    margin-right: 8px;
  }
  .ant-dropdown-menu-item {
    width: 160px;
  }
}
</style>

