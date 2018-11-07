<template>
    <PageHeaderLayout>
        <div class="standardList">
            <a-card :bordered="false">
                <a-row>
                    <a-col :sm="8" :xs="24">
                        <div class="headerInfo">
                            <span>我的待办</span>
                            <p>8个任务</p>
                            <em />
                        </div>
                    </a-col>
                    <a-col :sm="8" :xs="24">
                        <div class="headerInfo">
                            <span>本周任务平均处理时间</span>
                            <p>32分钟</p>
                            <em />
                        </div>
                    </a-col>
                    <a-col :sm="8" :xs="24">
                        <div class="headerInfo">
                            <span>本周完成任务数</span>
                            <p>24个任务</p>
                        </div>
                    </a-col>
                </a-row>
            </a-card>

            <a-card
                class="listCard"
                :bordered="false"
                title="标准列表"
                style="margin-top: 24px;"
                :bodyStyle="{ padding: '0 32px 40px 32px' }"
            >
                <template slot="extra">
                    <div className="extraContent">
                        <RadioGroup defaultValue="all">
                            <RadioButton value="all">全部</RadioButton>
                            <RadioButton value="progress">进行中</RadioButton>
                            <RadioButton value="waiting">等待中</RadioButton>
                        </RadioGroup>
                        <Search class="extraContentSearch" placeholder="请输入" :onSearch="() => ({})" />
                    </div>
                </template>
                <a-button type="dashed" style="width: 100%; margin-bottom: 8px;" icon="plus">添加</a-button>
                <a-list
                    size="large"
                    rowKey="id"
                    :loading="loading"
                    :pagination="paginationProps"
                    :dataSource="list"
                >
                    <a-list-item slot="renderItem" slot-scope="item">
                        <template slot="actions">
                            <a>编辑</a>
                        </template>
                        <template slot="actions">
                            <a-dropdown>
                                <template slot="overlay">
                                    <a-menu>
                                        <a-menu-item>
                                            <a>编辑</a>
                                        </a-menu-item>
                                        <a-menu-item>
                                            <a>删除</a>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <a>
                                    更多
                                    <a-icon type="down" />
                                </a>
                            </a-dropdown>
                        </template>
                        <a-list-item-meta :description="item.subDescription">
                            <template slot="avatar">
                                <a-avatar :src="item.logo" shape="square" size="large" />
                            </template>
                            <template slot="title">
                                <a :href="item.href">{{ item.title }}</a>
                            </template>
                        </a-list-item-meta>
                        <div class="listContent">
                            <div class="listContentItem">
                                <span>Owner</span>
                                <p>{{ item.owner }}</p>
                            </div>
                            <div class="listContentItem">
                                <span>开始时间</span>
                                <p>{{ moment(item.createdAt).format('YYYY-MM-DD HH:mm') }}</p>
                            </div>
                            <div class="listContentItem">
                                <Progress v-if="item.status=='normal'" :percent="item.percent" :strokeWidth="6" style="width: 180px;" />
                                <Progress v-else :percent="item.percent" :status="`${item.status}`" :strokeWidth="6" style="width: 180px;" />
                            </div>
                        </div>
                    </a-list-item>
                </a-list>
            </a-card>
        </div>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import { Radio, Input, Progress } from "ant-design-vue";
import moment from "moment";
export default {
  name: "BasicList",
  components: {
    PageHeaderLayout,
    RadioGroup: Radio.Group,
    RadioButton: Radio.Button,
    Search: Input.Search,
    Progress // eslint-disable-line
  },
  mounted() {
    this.$store.dispatch("fakeList/getList", { params: { count: 5 } });
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
  },
  data() {
    return {
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        total: 50
      },
      moment
    };
  }
};
</script>

<style lang="less">
@import "./BasicList.less";
</style>

