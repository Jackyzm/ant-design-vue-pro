<script>
import { Form, Input } from "ant-design-vue";
const Info = {
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
    onValidateForm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.$router.push("/form/step-form/confirm");
        }
      });
    }
  },
  render() {
    const { getFieldDecorator } = this.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    return (
      <div>
        <a-form layout="horizontal" class="stepForm" hideRequiredMark>
          <a-form-item {...{ props: formItemLayout }} label="付款账户">
            {getFieldDecorator("payAccount", {
              initialValue: this.data.payAccount,
              rules: [{ required: true, message: "请选择付款账户" }]
            })(
              <a-select placeholder="test@example.com">
                <a-select-option value="ant-design@alipay.com">
                  ant-design@alipay.com
                </a-select-option>
              </a-select>
            )}
          </a-form-item>
          <a-form-item {...{ props: formItemLayout }} label="收款账户">
            <Input.Group compact>
              <a-select defaultValue="alipay" style="width: 100px;">
                <a-select-option value="alipay">支付宝</a-select-option>
                <a-select-option value="bank">银行账户</a-select-option>
              </a-select>
              {getFieldDecorator("receiverAccount", {
                initialValue: this.data.receiverAccount,
                rules: [
                  { required: true, message: "请输入收款人账户" },
                  { type: "email", message: "账户名应为邮箱格式" }
                ]
              })(
                <a-input
                  style="width: calc(100% - 100px);"
                  placeholder="test@example.com"
                />
              )}
            </Input.Group>
          </a-form-item>
          <a-form-item {...{ props: formItemLayout }} label="收款人姓名">
            {getFieldDecorator("receiverName", {
              initialValue: this.data.receiverName,
              rules: [{ required: true, message: "请输入收款人姓名" }]
            })(<a-input placeholder="请输入收款人姓名" />)}
          </a-form-item>
          <a-form-item {...{ props: formItemLayout }} label="转账金额">
            {getFieldDecorator("amount", {
              initialValue: this.data.amount,
              rules: [
                { required: true, message: "请输入转账金额" },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: "请输入合法金额数字"
                }
              ]
            })(<a-input prefix="￥" placeholder="请输入金额" />)}
          </a-form-item>
          <a-form-item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span
              }
            }}
            label=""
          >
            <a-button type="primary" onClick={this.onValidateForm}>
              下一步
            </a-button>
          </a-form-item>
        </a-form>
        <a-divider style="margin: 40px 0 24px;" />
        <div class="desc">
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </div>
    );
  }
};
export default Form.create()(Info);
</script>

<style lang="less">
@import "./style.less";
</style>
