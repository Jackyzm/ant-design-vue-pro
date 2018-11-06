<template>
    <div>
        <a-row :gutter="24">
            <a-col :xl="18" :lg="24" :md="24" :sm="24" :xs="24" style="margin-bottom: 24px;">
                <a-card title="活动实时交易情况" :bordered="false">
                    <a-row>
                        <a-col :md="6" :sm="12" :xs="24">
                            <NumberInfo
                                subTitle="今日交易总额"
                                suffix="元"
                                :total="numeral(124543233).format('0,0')"
                            />
                        </a-col>
                        <a-col :md="6" :sm="12" :xs="24">
                            <NumberInfo subTitle="销售目标完成率" total="92%" />
                        </a-col>
                        <a-col :md="6" :sm="12" :xs="24">
                            <NumberInfo subTitle="活动剩余时间">
                                <template slot="total">
                                    <CountDown :target="targetTime" />
                                </template>
                            </NumberInfo>
                        </a-col>
                        <a-col :md="6" :sm="12" :xs="24">
                            <NumberInfo
                                subTitle="每秒交易总额"
                                suffix="元"
                                :total="numeral(234).format('0,0')"
                            />
                        </a-col>
                    </a-row>
                <div class="mapChart">
                    <a-tooltip title="等待后期实现">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png" alt="map" />
                    </a-tooltip>
                </div>
                </a-card>
            </a-col>
            <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card title="活动情况预测" style="margin-bottom: 24px;" :bordered="false">
                    <ActiveChart />
                </a-card>
                <a-card
                    title="券核效率"
                    style="margin-bottom: 24px;"
                    :bodyStyle="{ textAlign: 'center' }"
                    :bordered="false"
                >
                    <Gauge title="跳出率" :height="180" :percent="87" />
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="24">
            <a-col :xl="12" :lg="24" :sm="24" :xs="24">
                <a-card title="各品类占比" :bordered="false" class="pieCard">
                    <a-row style="padding: 16px 0;">
                        <a-col :span="8">
                            <MiniPie
                                :percent="28"
                                subTitle="中式快餐"
                                total="28%"
                                :height="128"
                                :radius="['68%', '80%']"
                            />
                        </a-col>
                        <a-col :span="8">
                            <MiniPie
                                color="#5DDECF"
                                :percent="22"
                                subTitle="西餐"
                                total="22%"
                                :height="128"
                                :radius="['68%', '80%']"
                            />
                        </a-col>
                        <a-col :span="8">
                            <MiniPie
                                color="#2FC25B"
                                :percent="32"
                                subTitle="火锅"
                                total="32%"
                                :height="128"
                                :radius="['68%', '80%']"
                            />
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :xl="6" :lg="12" :sm="24" :xs="24">
                <a-card
                    title="热门搜索"
                    :loading="loading"
                    :bordered="false"
                    :bodyStyle="{ overflow: 'hidden' }"
                >
                    <TagCloud :data="tags" :height="161" />
                </a-card>
            </a-col>
            <a-col :xl="6" :lg="12" :sm="24" :xs="24">
                <a-card
                    title="资源剩余"
                    :bodyStyle="{ textAlign: 'center', fontSize: 0 }"
                    :bordered="false"
                >
                    <WaterWave :height="161" title="补贴资金剩余" :percent="34" />
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import NumberInfo from "@/components/NumberInfo";
import CountDown from "@/components/CountDown";
import ActiveChart from "@/components/ActiveChart";
import numeral from "numeral";
import {
  colors,
  MiniPie,
  Gauge,
  TagCloud,
  WaterWave
} from "@/components/Charts";
export default {
  name: "Monitor",
  components: {
    NumberInfo,
    MiniPie,
    CountDown,
    ActiveChart,
    Gauge,
    TagCloud,
    WaterWave
  },
  created() {
    this.$store.dispatch("monitor/getTagsData");
  },
  computed: {
    tags() {
      return this.$store.state.monitor.data || [];
    }
  },
  data() {
    return {
      colors,
      numeral,
      targetTime: new Date().getTime() + 3900000,
      loading: false
    };
  }
};
</script>

<style lang="less" scoped>
@import "./Monitor.less";
</style>

