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
                        :onCollapse="()=>handleMenuCollapse()"
                        :onMenuClick="()=>handleMenuClick()"
                        :onNoticeVisibleChange="()=>handleNoticeVisibleChange()"
                    />
                </a-layout-header>
                <a-layout-content style="margin: 24px 24px 0; height: 100%">
                    <router-view></router-view>
                </a-layout-content>
                <a-layout-footer style="padding: 0">
                    <GlobalFooter/>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import GlobalFooter from "@/components/GlobalFooter";
import GlobalHeader from "@/components/GlobalHeader";
import SiderMenu from "@/components/SiderMenu";
import logo from "../../assets/logo.png";
import { message } from "ant-design-vue";
import { getMenuData } from "./menu.js";

export default {
  name: "BasicLayout",
  components: {
    GlobalFooter,
    GlobalHeader,
    SiderMenu
  },
  created(){
    //   console.log(this.$route, getMenuData())
      this.MenuData = getMenuData();
  },
  data() {
    return {
      MenuData: [],
      logo: logo,
      currentUser: {
        name: "Serati Ma",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        userid: "00000001",
        notifyCount: 12
      },
      fetchingNotices: false,
      notices: [
        {
          id: "000000001",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
          title: "你收到了 14 份新周报",
          datetime: "2017-08-09",
          type: "通知"
        },
        {
          id: "000000002",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
          title: "你推荐的 曲妮妮 已通过第三轮面试",
          datetime: "2017-08-08",
          type: "通知"
        },
        {
          id: "000000003",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
          title: "这种模板可以区分多种通知类型",
          datetime: "2017-08-07",
          read: true,
          type: "通知"
        },
        {
          id: "000000004",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
          title: "左侧图标用于区分不同的类型",
          datetime: "2017-08-07",
          type: "通知"
        },
        {
          id: "000000005",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
          title: "内容不要超过两行字，超出时自动截断",
          datetime: "2017-08-07",
          type: "通知"
        },
        {
          id: "000000006",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
          title: "曲丽丽 评论了你",
          description: "描述信息描述信息描述信息",
          datetime: "2017-08-07",
          type: "消息"
        },
        {
          id: "000000007",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
          title: "朱偏右 回复了你",
          description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
          datetime: "2017-08-07",
          type: "消息"
        },
        {
          id: "000000008",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
          title: "标题",
          description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
          datetime: "2017-08-07",
          type: "消息"
        },
        {
          id: "000000009",
          title: "任务名称",
          description: "任务需要在 2017-01-12 20:00 前启动",
          extra: "未开始",
          status: "todo",
          type: "待办"
        },
        {
          id: "000000010",
          title: "第三方紧急代码变更",
          description:
            "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
          extra: "马上到期",
          status: "urgent",
          type: "待办"
        },
        {
          id: "000000011",
          title: "信息安全考试",
          description: "指派竹尔于 2017-01-09 前完成更新并发布",
          extra: "已耗时 8 天",
          status: "doing",
          type: "待办"
        },
        {
          id: "000000012",
          title: "ABCD 版本发布",
          description:
            "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
          extra: "进行中",
          status: "processing",
          type: "待办"
        }
      ],
      collapsed: false
    };
  },
  methods: {
    handleNoticeClear(type) {
      message.success(`清空了${type}`);
      // this.props.dispatch({
      //     type: 'global/clearNotices',
      //     payload: type,
      // });
    },
    handleMenuCollapse(collapsed) {
        this.collapsed = !this.collapsed;
      // this.props.dispatch({
      //     type: 'global/changeLayoutCollapsed',
      //     payload: collapsed,
      // });
    },
    handleMenuClick({ key }) {
      if (key === "triggerError") {
        // this.props.dispatch(routerRedux.push('/exception/trigger'));
        return;
      }
      if (key === "logout") {
        // this.props.dispatch({
        //     type: 'login/logout',
        // });
      }
    },
    handleNoticeVisibleChange(visible) {
      if (visible) {
        // this.props.dispatch({
        //     type: 'global/fetchNotices',
        // });
      }
    }
  }
};
</script>
