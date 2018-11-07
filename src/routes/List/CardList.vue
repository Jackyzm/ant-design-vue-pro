<template>
    <PageHeaderLayout title="卡片列表" extraContent={extraContent}>
        <template slot="content">
            <div class="pageHeaderContent">
                <p>
                    段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
                    提供跨越设计与开发的体验解决方案。
                </p>
                <div class="contentLink">
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{{ ' ' }}
                        快速开始
                    </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{{ ' ' }}
                        产品简介
                    </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{{ ' ' }}
                        产品文档
                    </a>
                </div>
            </div>
        </template>
        <div slot="extraContent" class="extraImg">
            <img
                alt="这是一个标题"
                src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
            />
        </div>
        <div class="cardList">
            <a-list
                rowKey="id"
                :loading="loading"
                :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
                :dataSource="['', ...list]"
            >
                <template slot="renderItem" slot-scope="item">
                    <a-list-item v-if="item" :key="item.id">
                        <a-card hoverable class="card">
                            <template slot="actions">
                                    <a>操作一</a>
                                </template>
                                <template slot="actions">
                                    <a>操作二</a>
                                </template>
                            <a-card-meta>
                                <img alt="" slot="avatar" class="cardAvatar" :src="item.avatar" />
                                <a href="#" slot="title">{{ item.title }}</a>
                                <Ellipsis slot="description" className="item" :lines="3">{{ item.description }}</Ellipsis>
                            </a-card-meta>
                        </a-card>
                    </a-list-item>
                    <a-list-item v-else>
                        <a-button type="dashed" class="newButton">
                            <a-icon type="plus" /> 新增产品
                        </a-button>
                    </a-list-item>
                </template>
            </a-list>
        </div>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import Ellipsis from "@/components/Ellipsis";
export default {
  name: "CardList",
  components: {
    PageHeaderLayout,
    Ellipsis
  },
  mounted() {
    this.$store.dispatch("fakeList/getList", { params: { count: 8 } });
  },
  destroyed() {
    this.$store.dispatch("fakeList/clearList");
  },
  computed: {
    list() {
      return this.$store.state.fakeList.list;
    },
    loading() {
      return this.$store.state.fakeList.loading;
    }
  }
};
</script>

<style lang="less">
@import "./CardList.less";
</style>

