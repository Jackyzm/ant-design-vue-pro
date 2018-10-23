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
                        <span>{{yuan(126560)}}</span>
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
                        <span>{{numeral(8846).format('0,0')}}</span>
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
                        <span>{{numeral(6560).format('0,0')}}</span>
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

        <!-- <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="销售额" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="销售额趋势" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="访问量" key="views">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title="访问量趋势" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card> -->

        <!-- <a-row gutter={24}>
          <a-col xl={12} lg={24} md={24} sm={24} xs={24}>
            <a-card
              loading={loading}
              bordered={false}
              title="线上热门搜索"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <a-row gutter={68}>
                <a-col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <span>
                        搜索用户数
                        <a-tooltip title="指标文案">
                          <a-icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </a-tooltip>
                      </span>
                    }
                    gap={8}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </a-col>
                <a-col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="人均搜索次数"
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                    gap={8}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </a-col>
              </a-row>
              <a-table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </a-card>
          </a-col>
          <a-col xl={12} lg={24} md={24} sm={24} xs={24}>
            <a-card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="销售额类别占比"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">全部渠道</Radio.Button>
                      <Radio.Button value="online">线上</Radio.Button>
                      <Radio.Button value="offline">门店</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
              <Pie
                hasLegend
                subTitle="销售额"
                total={
                  () => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>
                }
                data={salesPieData}
                valueFormat={value => <Yuan>{value}</Yuan>}
                height={248}
                lineWidth={4}
              />
            </a-card>
          </a-col>
        </a-row> -->

        <!-- <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{ y1: '客流量', y2: '支付笔数' }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card> -->
  </div>
</template>

<script>
import Trend from '@/components/Trend';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
//   Bar,
//   Pie,
//   TimelineChart,
} from '@/components/Charts';

export default {
  name: "Analysis",
  components: {
      Trend,
      ChartCard,
      Field,
      MiniArea,
      MiniBar,
      MiniProgress
  },
  created() {
      this.$store.dispatch('analysis/getChartData');
  },
  computed: {
    //   chartData() {
    //       return this.$store.state.analysis.chartData;
    //   },
      visitData() {
          console.log(this.$store.state.analysis.chartData);
          return this.$store.state.analysis.chartData.visitData || [];
      }
  },
  data() {
    return {
        numeral,
        yuan,
        topColResponsiveProps:{
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: "margin-bottom: 24px;",
        },
        // visitData: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
