<template>
    <Popover
        placement="bottomRight"
        trigger="click"
        arrowPointAtCenter
        :popupAlign="popupAlign"
        @visibleChange="onPopupVisibleChange"
        overlayClassName="NoticeIcon"
      >
        <template slot="content">
            <Spin :spinning="loading" :delay="0">
                <Tabs class='tabs' @change="onTabChange">
                    <TabPane v-for="item in dataList" :tab="item.list && item.list.length > 0 ? `${item.title} (${item.list.length})` : item.title" :key="item.title">
                        <NoticeList
                            :data="item.list"
                            :onClick="value => onItemClick(value, item)"
                            :onClear="() => onClear(item.title)"
                            :title="item.title"
                            :locale="locale"
                            :emptyImage="item.emptyImage"
                            :emptyText="item.emptyText"
                        />
                    </TabPane>
                </Tabs>
            </Spin>
        </template>
        <span :class="className + ' noticeButton'">
            <Badge :count="count" class='badge'>
                <Icon type="bell" class='icon' />
            </Badge>
        </span>
      </Popover>
</template>

<script>
import NoticeList from "./NoticeList";
import groupBy from "lodash/groupBy";
import moment from "moment";
import { Popover, Spin, Tabs, Badge, Icon } from "ant-design-vue";

export default {
  name: "NoticeIcon",
  components: {
    NoticeList,
    Popover,
    Spin,
    Tabs,
    TabPane: Tabs.TabPane,
    Icon
  },
  props: {
    popupAlign: {
      type: Object
    },
    count: {
      type: Number
    },
    onClear: {
      type: Function
    },
    onItemClick: {
      type: Function
    },
    className: {
      type: String
    },
    onPopupVisibleChange: {
      type: Function
    },
    notices: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  computed: {
    dataList() {
      return [
        {
          list: this.getNoticeData()["通知"],
          title: "通知",
          emptyText: "你已查看所有通知",
          emptyImage:
            "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        },
        {
          list: this.getNoticeData()["消息"],
          title: "消息",
          emptyText: "您已读完所有消息",
          emptyImage:
            "https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        },
        {
          list: this.getNoticeData()["待办"],
          title: "待办",
          emptyText: "你已完成所有待办",
          emptyImage:
            "https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        }
      ];
    }
  },
  data() {
    return {
      tabType: "",
      locale: {
        emptyText: "暂无数据",
        clear: "清空"
      }
    };
  },
  methods: {
    getNoticeData() {
      if (this.notices.length === 0) {
        return {};
      }
      const newNotices = this.notices.map(notice => {
        const newNotice = { ...notice };
        if (newNotice.datetime) {
          newNotice.datetime = moment(notice.datetime).fromNow();
        }
        // transform id to item key
        if (newNotice.id) {
          newNotice.key = newNotice.id;
        }
        return newNotice;
      });
      return groupBy(newNotices, "type");
    },
    onTabChange(tabType) {
      this.tabType = tabType;
    }
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>

<style lang="less" scoped>
.noticeButton {
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s;
}

.icon {
  font-size: 16px;
  padding: 4px;
}

.tabs {
  .ant-tabs-nav-scroll {
    text-align: center;
  }
  .ant-tabs-bar {
    margin-bottom: 4px;
  }
}
</style>
