<template>
    <PageHeaderLayout title="单号：234231029431" :tabList="tabList" :tabActiveKey="tabActiveKey" :onTabChange="handleTabChange">
        <template slot="logo">
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        </template>
        <template slot="action">
            <a-button-group>
                <a-button>操作</a-button>
                <a-button>操作</a-button>
                <a-dropdown placement="bottomRight">
                    <template slot="overlay">
                        <a-menu>
                            <a-menu-item key="1">选项一</a-menu-item>
                            <a-menu-item key="2">选项二</a-menu-item>
                            <a-menu-item key="3">选项三</a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        <a-icon type="ellipsis" />
                    </a-button>
                </a-dropdown>
            </a-button-group>
            <a-button type="primary">主操作</a-button>
        </template>
        <template slot="content">
            <DescriptionList className="headerList" size="small" :col="2" :list="list" />
        </template>
        <template slot="extraContent">
            <a-row>
                <a-col :xs="24" :sm="12">
                    <div class="textSecondary">状态</div>
                    <div class="heading">待审批</div>
                </a-col>
                <a-col :xs="24" :sm="12">
                    <div class="textSecondary">订单金额</div>
                    <div class="heading">¥ 568.08</div>
                </a-col>
            </a-row>
        </template>
        <a-card title="流程进度" style="margin-bottom: 24px;" :bordered="false">
            <Steps :direction="stepDirection" :current="1">
                <template slot="progressDot" slot-scope="{title, status}">
                    <a-popover v-if="status == 'process'" placement="topLeft" arrowPointAtCenter>
                        <template slot="content">
                            <div style="width: 160px;">
                                吴加号
                                <span class="textSecondary" style="float: right;">
                                    <a-badge status="default" text="未响应" />
                                </span>
                                <div class="textSecondary" style="margin-top: 4px;">
                                    耗时：2小时25分钟
                                </div>
                            </div>
                        </template>
                        <a-badge status="processing" style="top: -4px;" />
                    </a-popover>
                    <a-badge v-else-if="status=='finish'" status="processing" style="top: -4px;" />
                    <a-badge v-else status="default" style="top: -4px;" />
                </template>
                <Step title="创建项目">
                    <div slot="description" class="textSecondary stepDescription">
                        曲丽丽
                        <a-icon type="dingding-o" style="margin-left: 8px;" />
                        <div>2016-12-12 12:32</div>
                    </div>
                </Step>
                <Step title="部门初审">
                    <div slot="description" class="stepDescription">
                        周毛毛
                        <a-icon type="dingding-o" style="color: #00A0E9; margin-left: 8px;" />
                        <div>
                            <a href="javascript:;">催一下</a>
                        </div>
                    </div>
                </Step>
                <Step title="财务复核" />
                <Step title="完成" />
            </Steps>
        </a-card>
        <a-card title="用户信息" style="margin-bottom: 24px;" :bordered="false">
            <DescriptionList style="margin-bottom: 24px;" :list="list1" />
            <DescriptionList style="margin-bottom: 24px;" title="信息组" :list="list2" />
            <h4 style="margin-bottom: 16px;">信息组</h4>
            <a-card type="inner" title="多层级信息组">
                <DescriptionList size="small" style="margin-bottom: 16px;" title="组名称" :list="list3" />
                <a-divider style="margin: 16px 0;" />
                <DescriptionList size="small" style="margin-bottom: 24px;" title="组名称" :col="1" :list="list4" />
                <a-divider style="margin: 16px 0;" />
                <DescriptionList size="small" title="组名称" :list="list5" />

            </a-card>
        </a-card>
        <a-card title="用户近半年来电记录" style="margin-bottom: 24px;" :bordered="false">
            <div class="noData">
                <a-icon type="frown-o" />暂无数据
            </div>
        </a-card>
        <a-card
          class="tabsCard"
          :bordered="false"
          :tabList="operationTabList"
          @tabChange="onOperationTabChange"
        >
            <a-table
                v-if="operationkey == 'tab1'"
                :pagination="false"
                :loading="loading"
                :dataSource="advancedOperation1"
                :columns="columns"
            />
            <a-table
                v-if="operationkey == 'tab2'"
                :pagination="false"
                :loading="loading"
                :dataSource="advancedOperation2"
                :columns="columns"
            />
            <a-table
                v-if="operationkey == 'tab3'"
                :pagination="false"
                :loading="loading"
                :dataSource="advancedOperation3"
                :columns="columns"
            />
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import DescriptionList from "@/components/DescriptionList";
import { Steps } from "ant-design-vue";
export default {
  name: "AdvancedProfile",
  components: {
    PageHeaderLayout,
    DescriptionList,
    Steps,
    Step: Steps.Step
  },
  computed: {
    loading() {
      return this.$store.state.advancedProfile.loading;
    },
    advancedOperation1() {
      return this.$store.state.advancedProfile.list.advancedOperation1 || [];
    },
    advancedOperation2() {
      return this.$store.state.advancedProfile.list.advancedOperation2 || [];
    },
    advancedOperation3() {
      return this.$store.state.advancedProfile.list.advancedOperation3 || [];
    }
  },
  mounted() {
    this.$store.dispatch("advancedProfile/getList");
  },
  destroyed() {
    this.$store.dispatch("advancedProfile/clearList");
  },
  data() {
    const list = [
      { term: "创建人", text: "曲丽丽" },
      { term: "订购产品", text: "XX 服务" },
      { term: "创建时间", text: "2017-07-07" },
      { term: "关联单据", text: <a>12421</a> },
      { term: "生效日期", text: "2017-07-07 ~ 2017-08-08" },
      { term: "备注", text: "请于两个工作日内确认" }
    ];
    const tabList = [
      {
        key: "detail",
        tab: "详情"
      },
      {
        key: "rule",
        tab: "规则"
      }
    ];
    const operationTabList = [
      {
        key: "tab1",
        tab: "操作日志一"
      },
      {
        key: "tab2",
        tab: "操作日志二"
      },
      {
        key: "tab3",
        tab: "操作日志三"
      }
    ];
    const list1 = [
      { term: "用户姓名", text: "付小小" },
      { term: "会员卡号", text: "32943898021309809423" },
      { term: "身份证", text: "3321944288191034921" },
      { term: "联系方式", text: "18112345678" },
      {
        term: "联系地址",
        text: "曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口"
      }
    ];
    const list2 = [
      { term: "某某数据", text: "725" },
      { term: "该数据更新时间", text: "2017-08-08" },
      { term: "", text: <span>&nbsp;</span> },
      {
        term: (
          <span>
            某某数据
            <a-tooltip title="数据说明">
              <a-icon
                style={{ color: "rgba(0, 0, 0, 0.43)", marginLeft: 4 }}
                type="info-circle-o"
              />
            </a-tooltip>
          </span>
        ),
        text: 725
      },
      { term: "该数据更新时间", text: "2017-08-08" }
    ];
    const list3 = [
      { term: "负责人", text: "林东东" },
      { term: "角色码", text: "1234567" },
      { term: "所属部门", text: "XX公司 - YY部" },
      { term: "过期时间", text: "2017-08-08" },
      {
        term: "描述",
        text:
          "这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长..."
      }
    ];

    const list4 = [
      {
        term: "学名",
        text: `Citrullus lanatus (Thunb.) Matsum. et
                        Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..`
      }
    ];
    const list5 = [
      { term: "负责人", text: "付小小" },
      { term: "角色码", text: "1234568" }
    ];
    const columns = [
      {
        title: "操作类型",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "操作人",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "执行结果",
        dataIndex: "status",
        key: "status",
        customRender: text =>
          text === "agree" ? (
            <a-badge status="success" text="成功" />
          ) : (
            <a-badge status="error" text="驳回" />
          )
      },
      {
        title: "操作时间",
        dataIndex: "updatedAt",
        key: "updatedAt"
      },
      {
        title: "备注",
        dataIndex: "memo",
        key: "memo"
      }
    ];
    return {
      list,
      list1,
      list2,
      list3,
      list4,
      list5,
      tabList,
      tabActiveKey: "detail",
      operationTabList,
      stepDirection: "horizontal",
      operationkey: "tab1",
      columns
    };
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key;
    },
    onOperationTabChange(key) {
      this.operationkey = key;
    }
  }
};
</script>

<style lang="less">
@import "./AdvancedProfile.less";
</style>

