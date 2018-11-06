<template>
    <a-form layout="horizontal" class="stepForm" :autoFormCreate="(form)=>{this.form = form}">
        <Alert
            closable
            showIcon
            message="确认转账后，资金将直接打入对方账户，无法退回。"
            style="margin-bottom: 24px;"
        />
        <a-form-item v-bind="formItemLayout" class="stepFormText" label="付款账户">
            {{ data.payAccount }}
        </a-form-item>
        <a-form-item v-bind="formItemLayout" class="stepFormText" label="收款账户">
            {{ data.receiverAccount }}
        </a-form-item>
        <a-form-item v-bind="formItemLayout" class="stepFormText" label="收款人姓名">
            {{ data.receiverName }}
        </a-form-item>
        <a-form-item v-bind="formItemLayout" class="stepFormText" label="转账金额">
            <span class="money">{{ data.amount }}</span>
            <span class="uppercase">（{{ digitUppercase(data.amount) }}）</span>
        </a-form-item>
        <a-divider style="margin: 24px 0;" />
        <a-form-item
            v-bind="formItemLayout"
            label="支付密码"
            :required="false"
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{
                initialValue: '123456',
                rules: [
                    {
                        required: true,
                        message: '需要支付密码才能进行支付',
                    },
                ],
            }"
        >
            <a-input type="password" autoComplete="off" style="width: 80%;" />
        </a-form-item>
        <a-form-item
            style="margin-bottom: 8;"
            :wrapperCol="{
                xs: { span: 24, offset: 0 },
                sm: {
                    span: formItemLayout.wrapperCol.span,
                    offset: formItemLayout.labelCol.span,
                },
            }"
            label=""
        >
            <a-button type="primary" @click="onValidateForm" :loading="submitting">
                提交
            </a-button>
            <a-button @click="onPrev" style="margin-left: 8px;">
                上一步
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { Alert } from 'ant-design-vue';
import { digitUppercase } from '@/utils/utils';

export default {
  name: "Confirm",
  components:{
      Alert
  },
  data() {
    return {
      submitting: false,
      digitUppercase,
      data: {
        payAccount: "ant-design@alipay.com",
        receiverAccount: "test@example.com",
        receiverName: "Alex",
        amount: "500"
      },
      formItemLayout: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        }
      }
    };
  },
  methods: {
    onValidateForm(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.$router.push("/form/step-form/result");
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form");
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
