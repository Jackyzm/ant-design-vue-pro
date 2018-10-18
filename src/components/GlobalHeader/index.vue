<template>
    <div class="header">
        <a-icon
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
          <a-tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              class="action"
            >
              <a-icon type="question-circle-o" />
            </a>
          </a-tooltip>
            <NoticeIcon
                className="action"
                :count="currentUser.notifyCount"
                :onItemClick="(item, tabProps) => {
                    console.log(item, tabProps); // eslint-disable-line
                }"
                :onClear="onNoticeClear"
                :onPopupVisibleChange="onNoticeVisibleChange"
                :loading="fetchingNotices"
                :popupAlign="{ offset: [20, -16] }"
                :notices="notices"
            />

            <a-dropdown v-if="currentUser.name">
                <a-menu slot="overlay" class="menu">
                    <a-menu-item disabled>
                        <a-icon type="user" />个人中心
                    </a-menu-item>
                    <a-menu-item disabled>
                        <a-icon type="setting" />设置
                    </a-menu-item>
                    <a-menu-item key="triggerError">
                        <a-icon type="close-circle" />触发报错
                    </a-menu-item>
                    <a-menu-divider/>
                    <a-menu-item key="logout">
                        <a-icon type="logout" />退出登录
                    </a-menu-item>
                </a-menu>
                <span class='action account'>
                    <a-avatar size="small" class="avatar" :src="currentUser.avatar" />
                    <span class="name">{{currentUser.name}}</span>
                </span>
            </a-dropdown>
            <a-spin v-else size="small" style="margin-left: 8px" />
        </div>
    </div>
</template>

<script>
import HeaderSearch from "../HeaderSearch";
import NoticeIcon from '../NoticeIcon';
export default {
  name: "GlobalHeader",
  components: {
    HeaderSearch,
    NoticeIcon
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
    onNoticeVisibleChange:{
        type: Function
    },
    onNoticeClear:{
        type:Function
    },
    fetchingNotices:{
        type:Boolean
    },
    notices:{
        type:Array
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
        console.log('input', value)
    },
    onPressEnter(value) {
        console.log('enter', value)
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

