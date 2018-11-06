<template>
    <PageHeaderLayout
        title="分步表单"
        :tabActiveKey="$route.path"
    >
        <template slot="content">
            <span>将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</span>
        </template>
        <a-card :bordered="false">
            <div>
                <Steps :current="this.getCurrentStep()" class="steps">
                    <Step title="填写转账信息" />
                    <Step title="确认转账信息" />
                    <Step title="完成" />
                </Steps>
                <router-view />
            </div>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import { Steps } from "ant-design-vue";
export default {
  name: "StepForm",
  components: {
    PageHeaderLayout,
    Steps,
    Step: Steps.Step
  },
  created() {},
  methods: {
    getCurrentStep() {
      const pathname = this.$route.path;
      const pathList = pathname.split("/");
      switch (pathList[pathList.length - 1]) {
        case "info":
          return 0;
        case "confirm":
          return 1;
        case "result":
          return 2;
        default:
          return 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
