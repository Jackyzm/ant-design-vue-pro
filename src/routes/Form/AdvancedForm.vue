<template>
    <PageHeaderLayout
        title="高级表单"
        wrapperClassName="advancedForm"
    >
        <template slot="content">
            <span>高级表单常见于一次性输入和提交大批量数据的场景。</span>
        </template>
        <a-form layout="vertical" hideRequiredMark :autoFormCreate="(form)=>{this.form = form}">
            <a-card title="仓库管理" class="card" :bordered="false">
                <a-row :gutter="16">
                    <a-col :lg="6" :md="12" :sm="24">
                        <a-form-item
                            :label="fieldLabels.name"
                            fieldDecoratorId="name"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请输入仓库名称' }],
                            }"
                        >
                            <a-input placeholder="请输入仓库名称" />
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 6, offset: 2 }" :lg="{ span: 8 }" :md="{ span: 12 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.url"
                            fieldDecoratorId="url"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择' }],
                            }"
                        >
                            <a-input
                                style="width: 100%;"
                                addonBefore="http://"
                                addonAfter=".com"
                                placeholder="请输入"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 8, offset: 2 }" :lg="{ span: 10 }" :md="{ span: 24 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.owner"
                            fieldDecoratorId="owner"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择管理员' }],
                            }"
                        >
                            <a-select placeholder="请选择管理员">
                                <a-select-option value="xiao">付晓晓</a-select-option>
                                <a-select-option value="mao">周毛毛</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="6" :md="12" :sm="24">
                        <a-form-item
                            :label="fieldLabels.approver"
                            fieldDecoratorId="approver"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择审批员' }],
                            }"
                        >
                            <a-select placeholder="请选择审批员">
                                <a-select-option value="xiao">付晓晓</a-select-option>
                                <a-select-option value="mao">周毛毛</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 6, offset: 2 }" :lg="{ span: 8 }" :md="{ span: 12 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.dateRange"
                            fieldDecoratorId="dateRange"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择生效日期' }],
                            }"
                        >
                            <RangePicker :placeholder="['开始日期', '结束日期']" style="width: 100%;" />
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 8, offset: 2 }" :lg="{ span: 10 }" :md="{ span: 24 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.type"
                            fieldDecoratorId="type"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择仓库类型' }],
                            }"
                        >
                            <a-select placeholder="请选择仓库类型">
                                <a-select-option value="private">私密</a-select-option>
                                <a-select-option value="public">公开</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            <!-- </a-form> -->
        </a-card>
        <a-card title="任务管理" class="card" :bordered="false">
            <!-- <a-form layout="vertical" hideRequiredMark> -->
                <a-row :gutter="16">
                    <a-col :lg="6" :md="12" :sm="24">
                        <a-form-item
                            :label="fieldLabels.name2"
                            fieldDecoratorId="name2"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请输入' }],
                            }"
                        >
                            <a-input placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 6, offset: 2 }" :lg="{ span: 8 }" :md="{ span: 12 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.url2"
                            fieldDecoratorId="url2"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择' }],
                            }"
                        >
                            <a-input placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 8, offset: 2 }" :lg="{ span: 10 }" :md="{ span: 24 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.owner2"
                            fieldDecoratorId="owner2"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择管理员' }],
                            }"
                        >
                            <a-select placeholder="请选择管理员">
                                <a-select-option value="xiao">付晓晓</a-select-option>
                                <a-select-option value="mao">周毛毛</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="6" :md="12" :sm="24">
                        <a-form-item
                            :label="fieldLabels.approver2"
                            fieldDecoratorId="approver2"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择审批员' }],
                            }"
                        >
                            <a-select placeholder="请选择审批员">
                                <a-select-option value="xiao">付晓晓</a-select-option>
                                <a-select-option value="mao">周毛毛</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 6, offset: 2 }" :lg="{ span: 8 }" :md="{ span: 12 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.dateRange2"
                            fieldDecoratorId="dateRange2"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请输入' }],
                            }"
                        >
                            <TimePicker
                                placeholder="提醒时间"
                                style="width: 100%;"
                                :getPopupContainer="trigger => trigger.parentNode"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :xl="{ span: 8, offset: 2 }" :lg="{ span: 10 }" :md="{ span: 24 }" :sm="24">
                        <a-form-item
                            :label="fieldLabels.type2"
                            fieldDecoratorId="type2"
                            :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请选择仓库类型' }],
                            }"
                        >
                            <a-select placeholder="请选择仓库类型">
                                <a-select-option value="private">私密</a-select-option>
                                <a-select-option value="public">公开</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
        </a-card>
        <a-card title="成员管理" :bordered="false">
            <a-form-item
                fieldDecoratorId="members"
                :fieldDecoratorOptions="{
                    initialValue: tableData,
                }"
            >
                <TableForm :onChange="(data)=>this.changeMembers(data)" />
            </a-form-item>
        </a-card>
        <FooterToolbar :style="`width: ${width}`">
          <span v-if="!(form && form.getFieldsError()) || (form && Object.keys(form.getFieldsError()).filter(key => form.getFieldsError()[key]).length === 0)" />
            <span v-else class="errorIcon">
                <a-popover
                    title="表单校验信息"
                    overlayClassName="errorPopover"
                    trigger="click"
                    :getPopupContainer="trigger => trigger.parentNode"
                >
                    <template slot="content" v-for="key in (form && Object.keys(form.getFieldsError()) || [])">
                        <li v-if="form.getFieldsError()[key]" :key="key" class="errorListItem" @click="() => scrollToField(key)">
                            <a-icon type="cross-circle-o" class="errorIcon" />
                            <div class="errorMessage">{{ form.getFieldsError()[key][0] }}</div>
                            <div class="errorField">{{ fieldLabels[key] }}</div>
                        </li>
                    </template>
                    <a-icon type="exclamation-circle" />
                </a-popover>
                {{ Object.keys(form.getFieldsError()).filter(key => form.getFieldsError()[key]).length }}
            </span>
            <a-button type="primary" @click="validate" :loading="submitting">
                提交
            </a-button>
        </FooterToolbar>
        </a-form>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import { DatePicker, TimePicker } from "ant-design-vue";
import FooterToolbar from "@/components/FooterToolbar";
import TableForm from "./TableForm";

export default {
  name: "AdvancedForm",
  components: {
    PageHeaderLayout,
    RangePicker: DatePicker.RangePicker,
    TimePicker,
    FooterToolbar,
    TableForm
  },
  computed: {},
  created() {
    window.addEventListener("resize", this.resizeFooterToolbar);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeFooterToolbar);
  },
  data() {
    return {
      width: "100%",
      submitting: false,
      fieldLabels: {
        name: "仓库名",
        url: "仓库域名",
        owner: "仓库管理员",
        approver: "审批人",
        dateRange: "生效日期",
        type: "仓库类型",
        name2: "任务名",
        url2: "任务描述",
        owner2: "执行人",
        approver2: "责任人",
        dateRange2: "生效日期",
        type2: "任务类型"
      },
      tableData: [
        {
          key: "1",
          workId: "00001",
          name: "John Brown",
          department: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          workId: "00002",
          name: "Jim Green",
          department: "London No. 1 Lake Park"
        },
        {
          key: "3",
          workId: "00003",
          name: "Joe Black",
          department: "Sidney No. 1 Lake Park"
        }
      ],
      form: undefined
    };
  },
  methods: {
    validate() {
      this.form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          console.log(values);
        }
      });
    },
    scrollToField(fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    },
    changeMembers(data) {
      this.form.setFieldsValue({ members: data });
    },
    resizeFooterToolbar() {
      const sider = document.querySelectorAll(".ant-layout-sider")[0];
      const width = `calc(100% - ${sider.style.width})`;
      if (this.width !== width) {
        this.width = width;
      }
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
