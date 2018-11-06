<template>
    <div class="BasicLayout">
        <a-layout class="ant-layout-has-sider">
            <SiderMenu
                :logo="logo"
                :menuData="MenuData"
                :collapsed="collapsed"
                :location="$route"
                :onCollapse="handleMenuCollapse"
            />
            <a-layout>
                <a-layout-header style="padding: 0">
                    <GlobalHeader
                        :currentUser="currentUser"
                        :fetchingNotices="fetchingNotices"
                        :notices="notices"
                        :collapsed="collapsed"
                        :onNoticeClear="(type)=>handleNoticeClear(type)"
                        :onCollapse="handleMenuCollapse"
                        :onMenuClick="(item)=>handleMenuClick(item)"
                        :onNoticeVisibleChange="(visible)=>handleNoticeVisibleChange(visible)"
                    />
                </a-layout-header>
                <a-layout-content style="margin: 24px 24px 0; height: 100%">
                    <router-view></router-view>
                </a-layout-content>
                <a-layout-footer style="padding: 0">
                    <GlobalFooter />
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import GlobalFooter from "@/components/GlobalFooter";
import GlobalHeader from "@/components/GlobalHeader";
import SiderMenu from "@/components/SiderMenu";
import logo from "@/assets/logo.png";
import { message } from "ant-design-vue";
import { getMenuData } from "./menu.js";

export default {
  name: "BasicLayout",
  components: {
    GlobalFooter,
    GlobalHeader,
    SiderMenu
  },
  created() {
    this.MenuData = getMenuData();
    this.$store.dispatch("header/getHeaderNotice");
    this.$store.dispatch("header/getUserCurrentData");
  },
  computed: {
    currentUser() {
      return this.$store.state.header.userCurrent;
    },
    notices() {
      return this.$store.state.header.notices;
    },
    fetchingNotices() {
      return this.$store.state.header.fetchNotice;
    }
  },
  data() {
    return {
      MenuData: [],
      logo: logo,
      collapsed: false
    };
  },
  methods: {
    handleNoticeClear(type) {
      message.success(`清空了${type}`);
      this.$store.dispatch("header/clearNotices", { type });
    },
    // eslint-disable-next-line
    handleMenuCollapse(collapsed) {
      this.collapsed = !this.collapsed;
    },
    handleMenuClick({ key }) {
      if (key === "triggerError") {
        this.$router.push("/exception/trigger");
        return;
      }
      if (key === "logout") {
        this.$router.push("/login");
      }
    },
    // eslint-disable-next-line
    handleNoticeVisibleChange(visible) {
      this.$store.dispatch("header/changeFetchNotice");
    }
  }
};
</script>
