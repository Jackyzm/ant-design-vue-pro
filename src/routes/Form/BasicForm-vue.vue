<template>
    <PageHeaderLayout title="基础表单">
        <template slot="content">
            <span>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</span>
        </template>
        <a-card :bordered="false">
            <a-form @submit="handleSubmit" hideRequiredMark style="margin-top: 8px;" :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                    v-bind="formItemLayout"
                    label="标题"
                    fieldDecoratorId="title"
                    :fieldDecoratorOptions="{
                        rules: [
                            {
                                required: true,
                                message: '请输入标题',
                            },
                        ],
                    }"
                >
                    <a-input placeholder="给目标起个名字" />
                </a-form-item>
                <a-form-item
                    v-bind="formItemLayout"
                    label="起止日期"
                    fieldDecoratorId="date"
                    :fieldDecoratorOptions="{
                        rules: [
                        {
                            required: true,
                            message: '请选择起止日期',
                        },
                        ],
                    }"
                >
                    <RangePicker style="width: 100%;" :placeholder="['开始日期', '结束日期']" />
                </a-form-item>
                <a-form-item
                    v-bind="formItemLayout"
                    label="目标描述"
                    fieldDecoratorId="goal"
                    :fieldDecoratorOptions="{
                        rules: [
                        {
                            required: true,
                            message: '请输入目标描述',
                        },
                        ],
                    }"
                >
                    <TextArea style="min-height: 32px;" placeholder="请输入你的阶段性工作目标" :rows="4" />
                </a-form-item>
                <a-form-item
                    v-bind="formItemLayout"
                    label="衡量标准"
                    fieldDecoratorId="standard"
                    :fieldDecoratorOptions="{
                        rules: [
                        {
                            required: true,
                            message: '请输入衡量标准',
                        },
                        ],
                    }"
                >
                    <TextArea style="min-height: 32px;" placeholder="请输入衡量标准" :rows="4" />
                </a-form-item>
                <a-form-item
                    v-bind="formItemLayout"
                    fieldDecoratorId="client"
                >
                    <template slot="label">
                        <span>
                            客户
                            <em class="optional">
                                （选填）
                                <a-tooltip title="目标的服务对象">
                                    <a-icon type="info-circle-o" style="margin-right: 4px;" />
                                </a-tooltip>
                            </em>
                        </span>
                    </template>
                    <a-input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" fieldDecoratorId="invites">
                    <template slot="label">
                        <span>
                            邀评人<em class="optional">（选填）</em>
                        </span>
                    </template>
                    <a-input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" fieldDecoratorId="weight">
                    <template slot="label">
                        <span>
                            权重<em class="optional">（选填）</em>
                        </span>
                    </template>
                    <InputNumber placeholder="请输入" :min="0" :max="100" />
                    <!-- <span class="ant-form-text">%</span> -->
                </a-form-item>
                <a-form-item
                    v-bind="formItemLayout"
                    label="目标公开"
                    help="客户、邀评人默认被分享"
                    fieldDecoratorId="public"
                    :fieldDecoratorOptions="{ initialValue: '1', }"
                >
                    <!-- <div> --> <!-- 这里使用template无法正确渲染  所以使用jsx -->
                        <RadioGroup>
                            <Radio value="1">公开</Radio>
                            <Radio value="2">部分公开</Radio>
                            <Radio value="3">不公开</Radio>
                        </RadioGroup>
                        <!-- <a-form-item style="margin-bottom: 0;" fieldDecoratorId="publicUsers">
                            <a-select
                                mode="multiple"
                                placeholder="公开给"
                                :style="`margin: 8px 0; display: ${form.getFieldValue('public') === '2' ? 'block' : 'none'}`"
                            >
                                <a-select-option value="1">同事甲</a-select-option>
                                <a-select-option value="2">同事乙</a-select-option>
                                <a-select-option value="3">同事丙</a-select-option>
                            </a-select>
                        </a-form-item> -->
                    <!-- </div> -->
                </a-form-item>
                <a-form-item v-bind="submitFormLayout" style="margin-top: 32px;">
                    <a-button type="primary" htmlType="submit" :loading="submitting">
                        提交
                    </a-button>
                    <a-button style="margin-left: 8px;">保存</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import { Radio, Input, InputNumber, DatePicker } from "ant-design-vue";
export default {
  name: "BasicForm",
  components: {
    PageHeaderLayout,
    TextArea: Input.TextArea, // eslint-disable-line
    Radio,
    RadioGroup: Radio.Group,
    InputNumber,
    RangePicker: DatePicker.RangePicker
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 }
        }
      },
      submitFormLayout: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 10, offset: 7 }
        }
      },
      submitting: false
    };
  },
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
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
