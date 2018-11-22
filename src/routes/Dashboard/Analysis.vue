<template>
    <div>
        <a-row :gutter="24">
            <a-col v-bind="topColResponsiveProps">
                <ChartCard
                    :bordered="false"
                    title="总销售额"
                    :contentHeight="46"
                >
                    <template slot="action">
                        <a-tooltip title="指标说明">
                            <a-icon type="info-circle-o" />
                        </a-tooltip>
                    </template>
                    <template slot="total">
                        <span>{{ yuan(126560) }}</span>
                    </template>
                    <template slot="content">
                        <Trend flag="up" style="margin-right: 16px">
                            <template slot="number">
                                周同比 <span class="trendText">12%</span>
                            </template>
                        </Trend>
                        <Trend flag="down">
                            <template slot="number">
                                日环比 <span class="trendText">11%</span>
                            </template>
                        </Trend>
                    </template>
                    <template slot="footer">
                        <Field label="日均销售额" :value="'￥'+ numeral(12423).format('0,0')" />
                    </template>
                </ChartCard>
            </a-col>
            <a-col v-bind="topColResponsiveProps">
                <ChartCard
                    :bordered="false"
                    title="访问量"
                    :contentHeight="46"
                >
                    <template slot="action">
                        <a-tooltip title="指标说明">
                            <a-icon type="info-circle-o" />
                        </a-tooltip>
                    </template>
                    <template slot="total">
                        <span>{{ numeral(8846).format('0,0') }}</span>
                    </template>
                    <template slot="content">
                        <MiniArea color="#975FE4" :data="visitData" />
                    </template>
                    <template slot="footer">
                        <Field label="日访问量" :value="numeral(1234).format('0,0')" />
                    </template>
                </ChartCard>
            </a-col>
            <a-col v-bind="topColResponsiveProps">
                <ChartCard
                    :bordered="false"
                    title="支付笔数"
                    :contentHeight="46"
                >
                    <template slot="action">
                        <a-tooltip title="指标说明">
                            <a-icon type="info-circle-o" />
                        </a-tooltip>
                    </template>
                    <template slot="total">
                        <span>{{ numeral(6560).format('0,0') }}</span>
                    </template>
                    <template slot="content">
                        <MiniBar :data="visitData" />
                    </template>
                    <template slot="footer">
                        <Field label="转化率" value="60%" />
                    </template>
                </ChartCard>
            </a-col>
            <a-col v-bind="topColResponsiveProps">
                <ChartCard
                    :bordered="false"
                    title="运营活动效果"
                    :contentHeight="46"
                >
                    <template slot="action">
                        <a-tooltip title="指标说明">
                            <a-icon type="info-circle-o" />
                        </a-tooltip>
                    </template>
                    <template slot="total">
                        <span>78%</span>
                    </template>
                    <template slot="content">
                        <MiniProgress :percent="78" strokeWidth="8px" :target="80" color="#13C2C2" />
                    </template>
                    <template slot="footer">
                        <div style="white-space: 'nowrap'; overflow: 'hidden'; display: flex;">
                            <Trend flag="up" trendStyle="flex:1;">
                                <template slot="number">
                                    周同比<span class="trendText">12%</span>
                                </template>
                            </Trend>
                            <Trend flag="down" trendStyle="flex:1;">
                                <template slot="number">
                                    日环比<span class="trendText">11%</span>
                                </template>
                            </Trend>
                        </div>
                    </template>
                </ChartCard>
            </a-col>
        </a-row>

        <a-card :loading="loading" :bordered="false" :bodyStyle="{'padding': 0}">
            <div class="salesCard">
                <a-tabs size="large" :tabBarStyle="{'marginBottom': 24}">
                    <template slot="tabBarExtraContent">
                        <div class="salesExtraWrap">
                            <div class="salesExtra">
                                <a :class="isActive('today')" @click="() => this.selectDate('today')">今日</a>
                                <a :class="isActive('week')" @click="() => this.selectDate('week')">本周</a>
                                <a :class="isActive('month')" @click="() => this.selectDate('month')">本月</a>
                                <a :class="isActive('year')" @click="() => this.selectDate('year')">全年</a>
                            </div>
                            <a-range-picker
                                :value="rangePickerValue"
                                @change="handleRangePickerChange"
                                style="width: 256px;"
                            />
                        </div>
                    </template>
                    <a-tab-pane tab="销售额" key="sales">
                        <a-row>
                            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                                <div class="salesBar">
                                    <Bar :height="295" title="销售额趋势" :data="salesData" />
                                </div>
                            </a-col>
                            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                                <div class="salesRank">
                                <h4 class="rankingTitle">门店销售额排名</h4>
                                <ul class="rankingList">
                                    <li v-for="(item, i) in rankingListData" :key="item.title">
                                        <span :class="i < 3 ? 'active' : ''">{{ i + 1 }}</span>
                                        <span>{{ item.title }}</span>
                                        <span>{{ numeral(item.total).format('0,0') }}</span>
                                    </li>
                                </ul>
                                </div>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane tab="访问量" key="views">
                        <a-row>
                            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                                <div class="salesBar">
                                    <Bar :height="292" title="访问量趋势" :data="salesData" />
                                </div>
                            </a-col>
                            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                                <div class="salesRank">
                                <h4 class="rankingTitle">门店访问量排名</h4>
                                <ul class="rankingList">
                                    <li v-for="(item, i) in rankingListData" :key="item.title">
                                        <span :class="i < 3 ? 'active' : ''">{{ i + 1 }}</span>
                                        <span>{{ item.title }}</span>
                                        <span>{{ numeral(item.total).format('0,0') }}</span>
                                    </li>
                                </ul>
                                </div>
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-card>

        <a-row :gutter="24">
            <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card
                    :loading="loading"
                    :bordered="false"
                    title="线上热门搜索"
                    style="margin-top: 24px;"
                >
                    <template slot="extra">
                        <span class="iconGroup">
                            <a-dropdown placement="bottomRight">
                                <template slot="overlay">
                                    <a-menu>
                                        <a-menu-item>操作一</a-menu-item>
                                        <a-menu-item>操作二</a-menu-item>
                                    </a-menu>
                                </template>
                                <a-icon type="ellipsis" />
                            </a-dropdown>
                        </span>
                    </template>
                    <a-row :gutter="68">
                        <a-col :sm="12" :xs="24" style="margin-bottom: 24px;">
                            <NumberInfo
                                :gap="8"
                                :total="numeral(12321).format('0,0')"
                                status="up"
                                :subTotal="17.1"
                            >
                                <div slot="subTitle" class="numberInfoSubTitle">
                                    <span>
                                        搜索用户数
                                        <a-tooltip title="指标文案">
                                            <a-icon style="margin-left: 8px;" type="info-circle-o" />
                                        </a-tooltip>
                                    </span>
                                </div>
                            </NumberInfo>
                            <MiniArea :height="45" :data="visitData2" />
                        </a-col>
                        <a-col :sm="12" :xs="24" style="margin-bottom: 24px;">
                            <NumberInfo
                                subTitle="人均搜索次数"
                                total="2.7"
                                status="down"
                                :subTotal="26.2"
                                :gap="8"
                            />
                            <MiniArea :height="45" :data="visitData2" />
                        </a-col>
                    </a-row>
                    <a-table
                        :rowKey="(record) => {return record.index}"
                        size="small"
                        :columns="columns"
                        :dataSource="searchData"
                        :pagination="{ style: 'margin-bottom: 0px;', pageSize: 5 }"
                    />
                </a-card>
            </a-col>
            <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card
                    :loading="loading"
                    class="salesCard"
                    :bordered="false"
                    title="销售额类别占比"
                    :bodyStyle="{ padding: 24 }"
                    style="margin-top: 24px; min-height: 509px;"
                >
                    <template slot="extra">
                        <div class="salesCardExtra">
                            <span class="iconGroup">
                                <a-dropdown placement="bottomRight">
                                    <template slot="overlay">
                                        <a-menu>
                                            <a-menu-item>操作一</a-menu-item>
                                            <a-menu-item>操作二</a-menu-item>
                                        </a-menu>
                                    </template>
                                    <a-icon type="ellipsis" />
                                </a-dropdown>
                            </span>
                            <div class="salesTypeRadio">
                                <a-radio-group :value="salesType" @change="handleChangeSalesType">
                                    <a-radio-button value="all">全部渠道</a-radio-button>
                                    <a-radio-button value="online">线上</a-radio-button>
                                    <a-radio-button value="offline">门店</a-radio-button>
                                </a-radio-group>
                            </div>
                        </div>
                    </template>
                    <h4 style="margin-top: 8px; margin-bottom: 32px;">销售额</h4>
                    <Pie
                        :hasLegend="true"
                        subTitle="销售额"
                        :data="salesPieData"
                        :total="yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))"
                        :valueFormat="value => yuan(value)"
                        :height="248"
                        :lineWidth="4"
                        :colors="colors"
                    />
                </a-card>
            </a-col>
        </a-row>

        <a-card
            :loading="loading"
            class="offlineCard"
            :bordered="false"
            :bodyStyle="{ padding: '0 0 32px 0' }"
            style="margin-top: 32px;"
        >
            <a-tabs :activeKey="activeKey" @change="handleTabChange">
                <a-tab-pane v-for="shop in offlineData" :key="shop.name">
                    <template slot="tab">
                        <a-row :gutter="8" style="width: 138px; margin: 8px 0;">
                            <a-col :span="12">
                                <NumberInfo
                                    :title="shop.name"
                                    subTitle="转化率"
                                    :gap="2"
                                    :total="`${shop.cvr * 100}%`"
                                    :theme="activeKey !== shop.name ? 'light' : ''"
                                />
                            </a-col>
                            <a-col :span="12" style="padding-top: 36px;">
                                <MiniPie
                                    :color="activeKey !== shop.name ? '#BDE4FF' : ''"
                                    :percent="shop.cvr * 100"
                                    :height="64"
                                    :radius="['36%', '66%']"
                                />
                            </a-col>
                        </a-row>
                    </template>
                    <div style="padding: '0 24px'">
                        <TimelineChart
                            :height="400"
                            :data="offlineChartData"
                            :titleMap="{ y1: '客流量', y2: '支付笔数' }"
                            :columns="['x', 'y1', 'y2']"
                            :colors="colors"
                        />
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
  </div>
</template>

<script>
import Trend from "@/components/Trend";
import NumberInfo from "@/components/NumberInfo";
import numeral from "numeral";
import { getTimeDistance } from "@/utils/utils";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  colors,
  TimelineChart,
  MiniPie
} from "@/components/Charts";

export default {
  name: "Analysis",
  components: {
    Trend,
    ChartCard,
    Field,
    MiniArea,
    MiniBar,
    MiniProgress,
    Bar,
    NumberInfo,
    Pie,
    TimelineChart,
    MiniPie
  },
  created() {
    this.$store.dispatch("analysis/getChartData");
    const rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234
      });
    }
    this.rankingListData = rankingListData;
  },
  destroyed() {
    this.$store.dispatch("analysis/clearChartData");
  },
  computed: {
    loading() {
      return this.$store.state.analysis.loading;
    },
    visitData() {
      //   console.log(this.$store.state.analysis.chartData);
      return this.$store.state.analysis.chartData.visitData || [];
    },
    salesData() {
      return this.$store.state.analysis.chartData.salesData || [];
    },
    visitData2() {
      return this.$store.state.analysis.chartData.visitData2 || [];
    },
    searchData() {
      return this.$store.state.analysis.chartData.searchData || [];
    },
    offlineData() {
      return this.$store.state.analysis.chartData.offlineData || [];
    },
    activeKey() {
      return (
        this.currentTabKey || (this.offlineData[0] && this.offlineData[0].name)
      );
    },
    salesPieData() {
      const allData = this.$store.state.analysis.chartData;
      return (
        (this.salesType === "all"
          ? allData["salesTypeData"]
          : this.salesType === "online"
            ? allData["salesTypeDataOnline"]
            : allData["salesTypeDataOffline"]) || []
      );
    },
    offlineChartData() {
      const arr = cloneDeep(
        this.$store.state.analysis.chartData.offlineChartData
      );
      arr.map(item => {
        return (item.x = moment(item.x).format("HH:mm"));
      });
      return arr || [];
    }
  },
  data() {
    return {
      numeral,
      yuan,
      colors,
      topColResponsiveProps: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 6,
        style: "margin-bottom: 24px;"
      },
      rangePickerValue: getTimeDistance("year"),
      salesType: "all",
      currentTabKey: "",
      columns: [
        {
          title: "排名",
          dataIndex: "index",
          key: "index"
        },
        {
          title: "搜索关键词",
          dataIndex: "keyword",
          key: "keyword",
          customRender: text => <a href="/">{text}</a>
        },
        {
          title: "用户数",
          dataIndex: "count",
          key: "count",
          sorter: (a, b) => a.count - b.count,
          className: "alignRight"
        },
        {
          title: "周涨幅",
          dataIndex: "range",
          key: "range",
          sorter: (a, b) => a.range - b.range,
          customRender: (text, record) => (
            <Trend flag={record.status === 1 ? "down" : "up"}>
              <template slot="number">
                <span style={{ marginRight: 4 }}>{text}%</span>
              </template>
            </Trend>
          ),
          align: "right"
        }
      ]
    };
  },
  methods: {
    handleRangePickerChange(rangePickerValue) {
      this.rangePickerValue = rangePickerValue;
      this.$store.dispatch("analysis/getChartData");
    },
    selectDate(type) {
      this.rangePickerValue = getTimeDistance(type);
      this.$store.dispatch("analysis/getChartData");
    },
    isActive(type) {
      const value = getTimeDistance(type);
      if (!this.rangePickerValue[0] || !this.rangePickerValue[1]) {
        return;
      }
      if (
        this.rangePickerValue[0].isSame(value[0], "day") &&
        this.rangePickerValue[1].isSame(value[1], "day")
      ) {
        return "currentDate";
      }
    },
    handleChangeSalesType(e) {
      this.salesType = e.target.value;
    },
    handleTabChange(key) {
      this.currentTabKey = key;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "./Analysis.less";
</style>
