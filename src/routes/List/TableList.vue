<template>
    <PageHeaderLayout title="查询表格">
        <a-card :bordered="false">
            <div class="tableList">
                <div class="tableListForm">
                    <a-form v-if="expandForm" @submit="handleSearch" layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                        <a-row :gutter="{ md: 8, lg: 24, xl: 48 }">
                            <a-col :md="8" :sm="24">
                                <a-form-item label="规则编号" fieldDecoratorId="no">
                                    <a-input placeholder="请输入" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="使用状态" fieldDecoratorId="status">
                                    <a-select placeholder="请选择" style="width: 100%;">
                                        <a-select-option value="0">关闭</a-select-option>
                                        <a-select-option value="1">运行中</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="调用次数" fieldDecoratorId="number">
                                    <InputNumber style="width: 100%;" />
                                </a-form-item>
                            </a-col>
                            </a-row>
                            <a-row :gutter="{ md: 8, lg: 24, xl: 48 }">
                            <a-col :md="8" :sm="24">
                                <a-form-item label="更新日期" fieldDecoratorId="date">
                                    <DatePicker style="width: 100%;" placeholder="请输入更新日期" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="使用状态" fieldDecoratorId="status3">
                                    <a-select placeholder="请选择" style="width: 100%;">
                                        <a-select-option value="0">关闭</a-select-option>
                                        <a-select-option value="1">运行中</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="使用状态" fieldDecoratorId="status4">
                                    <a-select placeholder="请选择" style="width: 100%;">
                                        <a-select-option value="0">关闭</a-select-option>
                                        <a-select-option value="1">运行中</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <div style="overflow: hidden;">
                            <span style="float: right; margin-bottom: 24px;">
                                <a-button type="primary" htmlType="submit">
                                    查询
                                </a-button>
                                <a-button style="margin-left: 8px;" @click="handleFormReset">
                                    重置
                                </a-button>
                                <a style="margin-left: 8px;" @click="toggleForm">
                                    收起 <a-icon type="up" />
                                </a>
                            </span>
                        </div>
                    </a-form>
                    <a-form v-else @submit="handleSearch" layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                        <a-row :gutter="{ md: 8, lg: 24, xl: 48 }">
                            <a-col :md="8" :sm="24">
                                <a-form-item label="规则编号" fieldDecoratorId="no">
                                    <a-input placeholder="请输入" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="使用状态" fieldDecoratorId="status">
                                    <a-select placeholder="请选择" style="width: 100%;">
                                        <a-select-option value="0">关闭</a-select-option>
                                        <a-select-option value="1">运行中</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <span class="submitButtons">
                                    <a-button type="primary" htmlType="submit">
                                        查询
                                    </a-button>
                                    <a-button style="margin-left: 8px;" @click="handleFormReset">
                                        重置
                                    </a-button>
                                    <a style="margin-left: 8px;" @click="toggleForm">
                                        展开 <a-icon type="down" />
                                    </a>
                                </span>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <div class="tableListOperator">
                    <a-button icon="plus" type="primary" @click="handleModalVisible(true)">
                        新建
                    </a-button>
                    <span v-if="selectedRows.length > 0">
                        <a-button>批量操作</a-button>
                        <a-dropdown>
                            <template slot="overlay">
                                <a-menu @click="handleMenuClick" :selectedKeys="[]">
                                    <a-menu-item key="remove">删除</a-menu-item>
                                    <a-menu-item key="approval">批量审批</a-menu-item>
                                </a-menu>
                            </template>
                            <a-button>
                                更多操作 <a-icon type="down" />
                            </a-button>
                        </a-dropdown>
                    </span>
                </div>
                <StandardTable
                    :selectedRows="selectedRows"
                    :loading="loading"
                    :list="data.list"
                    :pagination="data.pagination"
                    :columns="columns"
                    :onSelectRow="handleSelectRows"
                    :onChange="handleStandardTableChange"
                />
            </div>
        </a-card>
        <!-- <CreateForm {...parentMethods} modalVisible={modalVisible} /> -->
        <a-modal
            title="新建规则"
            :visible="modalVisible"
            @ok="okHandle"
            @cancel="handleModalVisible"
        >
            <a-form :autoFormCreate="(form)=>{this.createForm = form}">
                <a-form-item
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 15 }"
                    label="描述"
                    fieldDecoratorId="desc"
                    :fieldDecoratorOptions="{
                        rules: [{ required: true, message: 'Please input some description...' }],
                    }"
                >
                    <a-input placeholder="请输入" />
                </a-form-item>
            </a-form>
        </a-modal>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import StandardTable from "@/components/StandardTable";
import moment from "moment";
import { InputNumber, DatePicker, Badge, message } from "ant-design-vue";
export default {
  name: "TableList",
  components: {
    PageHeaderLayout,
    InputNumber,
    DatePicker,
    StandardTable
  },
  created() {
    this.$store.dispatch("tableList/getList", { params: {} });
  },
  destroyed() {
    this.$store.dispatch("tableList/clearList");
  },
  computed: {
    data() {
      return this.$store.state.tableList.list;
    },
    loading() {
      return this.$store.state.tableList.loading;
    }
  },
  data() {
    const statusMap = ["default", "processing", "success", "error"];
    const status = ["关闭", "运行中", "已上线", "异常"];
    return {
      modalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      columns: [
        {
          title: "规则编号",
          dataIndex: "no"
        },
        {
          title: "描述",
          dataIndex: "description"
        },
        {
          title: "服务调用次数",
          dataIndex: "callNo",
          sorter: true,
          align: "right",
          customRender: val => `${val} 万`,
          // mark to display a total number
          needTotal: true
        },
        {
          title: "状态",
          dataIndex: "status",
          filters: [
            {
              text: status[0],
              value: "0"
            },
            {
              text: status[1],
              value: "1"
            },
            {
              text: status[2],
              value: "2"
            },
            {
              text: status[3],
              value: "3"
            }
          ],
          onFilter: (value, record) => record.status.toString() === value,
          customRender: val => {
            return <Badge status={statusMap[val]} text={status[val]} />;
          }
        },
        {
          title: "更新时间",
          dataIndex: "updatedAt",
          sorter: true,
          customRender: val => (
            <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
          )
        },
        {
          title: "操作",
          customRender: () => (
            <div>
              <a>配置</a>
              <a-divider type="vertical" />
              <a>订阅警报</a>
            </div>
          )
        }
      ]
    };
  },
  methods: {
    handleModalVisible(flag) {
      this.modalVisible = !!flag;
    },
    handleSearch(e) {
      e.preventDefault();

      this.form.validateFields((err, fieldsValue) => {
        if (err) return;

        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
        };
        this.formValues = values;
        this.$store.dispatch("tableList/getList", { params: values });
      });
    },
    handleFormReset() {
      this.form.resetFields();
      this.formValues = {};
      this.$store.dispatch("tableList/getList", { params: {} });
    },
    toggleForm() {
      this.expandForm = !this.expandForm;
    },
    handleSelectRows(rows) {
      this.selectedRows = rows;
    },
    handleStandardTableChange(pagination, filtersArg, sorter) {
      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj = { ...obj };
        newObj[key] = this.getValue(filtersArg[key]);
        return newObj;
      }, {});

      const params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        ...this.formValues,
        ...filters
      };
      if (sorter.field) {
        params.sorter = `${sorter.field}_${sorter.order}`;
      }
      this.$store.dispatch("tableList/getList", { params });
    },
    getValue(obj) {
      return Object.keys(obj)
        .map(key => obj[key])
        .join(",");
    },
    handleMenuClick(e) {
      if (!this.selectedRows) return;

      switch (e.key) {
        case "remove":
          this.$store.dispatch("tableList/deleteList", {
            params: {
              no: this.selectedRows.map(row => row.no).join(",")
            },
            callback: () => {
              this.selectedRows = [];
            }
          });
          break;
        default:
          break;
      }
    },
    okHandle() {
      this.createForm.validateFields((err, fieldsValue) => {
        if (err) return;
        this.createForm.resetFields();
        this.handleAdd(fieldsValue);
      });
    },
    handleAdd(fields) {
      this.$store.dispatch("tableList/addList", {
        params: { description: fields.desc }
      });

      message.success("添加成功");
      this.modalVisible = false;
    }
  }
};
</script>

<style lang="less">
@import "./TableList.less";
</style>

