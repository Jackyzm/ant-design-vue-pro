<template>
    <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        class="result"
    >
        <template slot="extra">
            <div class="information">
                <a-row>
                    <a-col :xs="24" :sm="8" class="label">
                        付款账户：
                    </a-col>
                <a-col :xs="24" :sm="16">
                    {{ data.payAccount }}
                </a-col>
                </a-row>
                <a-row>
                    <a-col :xs="24" :sm="8" class="label">
                        收款账户：
                    </a-col>
                    <a-col :xs="24" :sm="16">
                        {{ data.receiverAccount }}
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :xs="24" :sm="8" class="label">
                        收款人姓名：
                    </a-col>
                    <a-col :xs="24" :sm="16">
                        {{ data.receiverName }}
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :xs="24" :sm="8" class="label">
                        转账金额：
                    </a-col>
                    <a-col :xs="24" :sm="16">
                        <span class="money">{{ data.amount }}</span> 元
                    </a-col>
                </a-row>
            </div>
        </template>
        <template slot="actions">
            <a-button type="primary" @click="onFinish">
                再转一笔
            </a-button>
            <a-button>查看账单</a-button>
        </template>
    </Result>
</template>

<script>
import Result from "@/components/Result";

export default {
  name: "StepFormResult",
  components: {
    Result
  },
  data() {
    return {
      data: {
        payAccount: "ant-design@alipay.com",
        receiverAccount: "test@example.com",
        receiverName: "Alex",
        amount: "500"
      }
    };
  },
  methods: {
    onFinish() {
      this.$router.push("/form/step-form");
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
