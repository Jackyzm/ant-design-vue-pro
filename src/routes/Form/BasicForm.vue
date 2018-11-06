<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import { Radio, Input, InputNumber, DatePicker, Form } from "ant-design-vue";

const BasicForm = {
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log(values);
          // this.props.dispatch({
          //   type: 'form/submitRegularForm',
          //   payload: values,
          // });
        }
      });
    }
  },
  data() {
    return {
      submitting: false
    };
  },
  render() {
    const { getFieldDecorator } = this.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    };
    return (
      <PageHeaderLayout title="基础表单">
        <template slot="content">
          <span>
            表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
          </span>
        </template>
        <a-card bordered={false}>
          <a-form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <a-form-item {...{ props: formItemLayout }} label="标题">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "请输入标题"
                  }
                ]
              })(<Input placeholder="给目标起个名字" />)}
            </a-form-item>
            <a-form-item {...{ props: formItemLayout }} label="起止日期">
              {getFieldDecorator("date", {
                rules: [
                  {
                    required: true,
                    message: "请选择起止日期"
                  }
                ]
              })(
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  placeholder={["开始日期", "结束日期"]}
                />
              )}
            </a-form-item>
            <a-form-item {...{ props: formItemLayout }} label="目标描述">
              {getFieldDecorator("goal", {
                rules: [
                  {
                    required: true,
                    message: "请输入目标描述"
                  }
                ]
              })(
                <Input.TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入你的阶段性工作目标"
                  rows={4}
                />
              )}
            </a-form-item>
            <a-form-item {...{ props: formItemLayout }} label="衡量标准">
              {getFieldDecorator("standard", {
                rules: [
                  {
                    required: true,
                    message: "请输入衡量标准"
                  }
                ]
              })(
                <Input.TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入衡量标准"
                  rows={4}
                />
              )}
            </a-form-item>
            <a-form-item
              {...{ props: formItemLayout }}
              label={
                <span>
                  客户
                  <em class="optional">
                    （选填）
                    <a-tooltip title="目标的服务对象">
                      <a-icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </a-tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator("client")(
                <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
              )}
            </a-form-item>
            <a-form-item
              {...{ props: formItemLayout }}
              label={
                <span>
                  邀评人
                  <em class="optional">（选填）</em>
                </span>
              }
            >
              {getFieldDecorator("invites")(
                <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
              )}
            </a-form-item>
            <a-form-item
              {...{ props: formItemLayout }}
              label={
                <span>
                  权重
                  <em class="optional">（选填）</em>
                </span>
              }
            >
              {getFieldDecorator("weight")(
                <InputNumber placeholder="请输入" min={0} max={100} />
              )}
              <span class="ant-form-text">%</span>
            </a-form-item>
            <a-form-item
              {...{ props: formItemLayout }}
              label="目标公开"
              help="客户、邀评人默认被分享"
            >
              <div>
                {getFieldDecorator("public", {
                  initialValue: "1"
                })(
                  <Radio.Group>
                    <Radio value="1">公开</Radio>
                    <Radio value="2">部分公开</Radio>
                    <Radio value="3">不公开</Radio>
                  </Radio.Group>
                )}
                <a-form-item style={{ marginBottom: 0 }}>
                  {getFieldDecorator("publicUsers")(
                    <a-select
                      mode="multiple"
                      placeholder="公开给"
                      style={{
                        margin: "8px 0",
                        display:
                          this.form.getFieldValue("public") === "2"
                            ? "block"
                            : "none"
                      }}
                    >
                      <a-select-option value="1">同事甲</a-select-option>
                      <a-select-option value="2">同事乙</a-select-option>
                      <a-select-option value="3">同事丙</a-select-option>
                    </a-select>
                  )}
                </a-form-item>
              </div>
            </a-form-item>
            <a-form-item
              {...{ props: submitFormLayout }}
              style="margin-top: 32px;"
            >
              <a-button
                type="primary"
                htmlType="submit"
                loading={this.submitting}
              >
                提交
              </a-button>
              <a-button style="margin-left: 8px;">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </PageHeaderLayout>
    );
  }
};
export default Form.create()(BasicForm);
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
