<template>
    <PageHeaderLayout>
        <a-card :bordered="false">
            <Result
                type="success"
                title="提交成功"
                description="提交结果页用于反馈一系列操作任务的处理结果，
                如果仅是简单操作，使用 Message 全局提示反馈即可。
                本文字区域可以展示简单的补充说明，如果有类似展示
                “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
                style="margin-top: 48; margin-bottom: 16px;"
            >
                <template slot="extra">
                    <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85);font-weight: 500;margin-bottom: 20px;">
                        项目名称
                    </div>
                    <a-row style="margin-bottom: 16px;">
                        <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
                            <span style="color: rgba(0, 0, 0, 0.85);">项目 ID：</span>
                            23421
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
                            <span style="color: rgba(0, 0, 0, 0.85);">负责人：</span>
                            曲丽丽
                        </a-col>
                        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                            <span style="color: rgba(0, 0, 0, 0.85);">生效时间：</span>
                            2016-12-12 ~ 2017-12-12
                        </a-col>
                    </a-row>
                    <Steps style="margin-left: -42px; width: calc(100% + 84px);" progressDot :current="1">
                        <Step>
                            <span slot="title" style="font-size: 14px;">创建项目</span>
                            <template slot="description">
                                <div style="font-size: 12px; color: rgba(0, 0, 0, 0.45); position: relative;">
                                    <div style="margin: 8px 0 4px;">
                                        曲丽丽<a-icon style="margin0left: 8px;" type="dingding-o" />
                                    </div>
                                    <div>2016-12-12 12:32</div>
                                </div>
                            </template>
                        </Step>
                        <Step>
                            <span slot="title" style="font-size: 14px;">部门初审</span>
                            <template slot="description">
                                <div style="font-size: 12px; position: relative;">
                                    <div style="margin: 8px 0 4px;">
                                        周毛毛<a-icon type="dingding-o" style="color: #00A0E9; margin-left: 8px;" />
                                    </div>
                                    <div>
                                        <a href="javascript:;">催一下</a>
                                    </div>
                                </div>
                            </template>
                        </Step>
                        <Step>
                            <span slot="title" style="font-size: 14px;">财务复核</span>
                        </Step>
                        <Step>
                            <span slot="title" style="font-size: 14px;">完成</span>
                        </Step>
                    </Steps>
                </template>
                <template slot="actions">
                    <a-button type="primary">返回列表</a-button>
                    <a-button>查看项目</a-button>
                    <a-button>打 印</a-button>
                </template>
            </Result>
        </a-card>
  </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import Result from "@/components/Result";
import { Steps } from "ant-design-vue";
export default {
  name: "Success",
  components: {
    PageHeaderLayout,
    Result,
    Steps,
    Step: Steps.Step
  }
};
</script>

<style lang="less" scoped>
</style>

