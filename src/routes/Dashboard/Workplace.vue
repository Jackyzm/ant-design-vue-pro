<template>
    <PageHeaderLayout>
        <template slot="content">
            <div class="pageHeaderContent">
                <div class="avatar">
                    <a-avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                </div>
                <div class="content">
                    <div class="contentTitle">早安，曲丽丽，祝你开心每一天！</div>
                    <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
                </div>
            </div>
        </template>
        <template slot="extraContent">
            <div class="extraContent">
                <div class="statItem">
                    <p>项目数</p>
                    <p>56</p>
                </div>
                <div class="statItem">
                    <p>团队内排名</p>
                    <p>
                        8<span> / 24</span>
                    </p>
                </div>
                <div class="statItem">
                    <p>项目访问</p>
                    <p>2,223</p>
                </div>
            </div>
        </template>
        <a-row :gutter="24">
            <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card
                    class="projectList"
                    style="margin-bottom: 24px;"
                    title="进行中的项目"
                    :bordered="false"
                    :loading="projectLoading"
                    :bodyStyle="{ padding: 0 }"
                >
                    <template slot="extra">
                        <router-link to="/">全部项目</router-link>
                    </template>
                    <a-card-grid v-for="item in notice" class="projectGrid" :key="item.id">
                        <a-card :bodyStyle="{ padding: 0 }" :bordered="false">
                            <a-card-meta :description="item.description">
                                <template slot="title">
                                    <div class="cardTitle">
                                        <a-avatar size="small" :src="item.logo" />
                                        <router-link :to="item.href">{{ item.title }}</router-link>
                                    </div>
                                </template>
                            </a-card-meta>
                            <div class="projectItemContent">
                            <a to="memberLink">{{ item.member || '' }}</a>
                                <span v-if="item.updatedAt" class="datetime" title="item.updatedAt">
                                    {{ moment(item.updatedAt).fromNow() }}
                                </span>
                            </div>
                        </a-card>
                    </a-card-grid>
                </a-card>
                <a-card
                    :bodyStyle="{ padding: 0 }"
                    :bordered="false"
                    class="activeCard"
                    title="动态"
                    :loading="activitiesLoading"
                >
                <a-list :loading="activitiesLoading" size="large">
                    <div class="activitiesList">
                        <a-list-item v-for="item in activities" :key="item.id">
                            <a-list-item-meta>
                                <template slot="avatar">
                                    <a-avatar :src="item.user.avatar" />
                                </template>
                                <template slot="title">
                                    <span>
                                        <a class="username">{{ item.user.name }}</a>
                                        &nbsp;
                                        <span class="event">
                                            <template v-for="(key,index) in item.template.split(/@\{([^{}]*)\}/gi)">
                                                <a v-if="item[key]" :href="item[key].link" :key="item[key].name">
                                                    {{ item[key].name }}
                                                </a>
                                                <span v-else :key="index">{{ key }}</span>
                                            </template>
                                        </span>
                                    </span>
                                </template>
                                <template slot="description">
                                    <span class="datetime" :title="item.updatedAt">
                                        {{ moment(item.updatedAt).fromNow() }}
                                    </span>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </div>
                </a-list>
                </a-card>
            </a-col>
            <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
                <a-card
                    style="margin-bottom: 24px;"
                    title="快速开始 / 便捷导航"
                    :bordered="false"
                    :bodyStyle="{ padding: 0 }"
                >
                    <EditableLinkGroup :onAdd="() => {console.debug('12')}" :links="links" />
                </a-card>
                <a-card
                    style="margin-bottom: 24px;"
                    :bordered="false"
                    title="XX 指数"
                    :loading="radarData.length === 0"
                >
                    <div class="chart">
                        <Radar hasLegend :height="343" :data="radarData | dealWithChartData" :columns="['name', '引用', '口碑', '产量', '贡献', '热度']" />
                    </div>
                </a-card>
                <a-card :bodyStyle="{ paddingTop: 12, paddingBottom: 12 }" :bordered="false" title="团队">
                    <div class="members">
                        <a-row :gutter="48">
                            <a-col v-for="item in members" :span="12" style="padding-right: 0;" :key="`members-item-${item.id}`">
                                <router-link :to="item.link">
                                    <a-avatar :src="item.logo" size="small" />
                                    <span class="member">{{ item.title }}</span>
                                </router-link>
                            </a-col>
                        </a-row>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import EditableLinkGroup from "@/components/EditableLinkGroup";
import moment from "moment";
import { Radar } from "@/components/Charts";
import groupBy from "lodash/groupBy";

export default {
  name: "Workplace",
  components: {
    PageHeaderLayout,
    EditableLinkGroup,
    Radar
  },
  created() {
    this.$store.dispatch("workplace/getNoticeData");
    this.$store.dispatch("workplace/getActivitiesData");
    this.$store.dispatch("analysis/getChartData");
  },
  filters: {
    dealWithChartData(value) {
      const arr = groupBy(value, "name");
      const newArr = [];
      Object.entries(arr).map(item => {
        const obj = {
          name: item[0]
        };
        item[1].map(val => {
          obj[`${val.label}`] = val.value;
        });
        newArr.push(obj);
      });
      return newArr;
    }
  },
  computed: {
    activities() {
      return this.$store.state.workplace.activities || [];
    },
    notice() {
      return this.$store.state.workplace.notice || [];
    },
    radarData() {
      return this.$store.state.analysis.chartData.radarData || [];
    }
  },
  data() {
    return {
      links: [
        {
          title: "操作一",
          href: ""
        },
        {
          title: "操作二",
          href: ""
        },
        {
          title: "操作三",
          href: ""
        },
        {
          title: "操作四",
          href: ""
        },
        {
          title: "操作五",
          href: ""
        },
        {
          title: "操作六",
          href: ""
        }
      ],
      members: [
        {
          id: "members-1",
          title: "科学搬砖组",
          logo:
            "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          link: ""
        },
        {
          id: "members-2",
          title: "程序员日常",
          logo:
            "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
          link: ""
        },
        {
          id: "members-3",
          title: "设计天团",
          logo:
            "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
          link: ""
        },
        {
          id: "members-4",
          title: "中二少女团",
          logo:
            "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
          link: ""
        },
        {
          id: "members-5",
          title: "骗你学计算机",
          logo:
            "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
          link: ""
        }
      ],
      projectLoading: false,
      activitiesLoading: false,
      moment
    };
  }
};
</script>

<style lang="less">
@import "./Workplace.less";
</style>
