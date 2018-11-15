<template>
    <div class="standardTable">
        <div class="tableAlert">
            <Alert
                type="info"
                showIcon
            >
                <template slot="message">
                    已选择 <a style="font-weight: 600;">{{ selectedRowKeys.length }}</a> 项&nbsp;&nbsp;
                    <span v-for="item in needTotalList" style="margin-left: 8px;" :key="item.dataIndex">
                        {{ item.title }}总计&nbsp;
                        <span style="font-weight: 600;">
                            {{ item.render ? item.render(item.total) : item.total }}
                        </span>
                    </span>
                    <a @click="cleanSelectedKeys" style="margin-left: 24px;">
                        清空
                    </a>
                </template>
            </Alert>
        </div>
        <Table
            :loading="loading"
            :rowKey="rowKey || 'key'"
            :rowSelection="{
                selectedRowKeys: selectedRowKeys,
                onChange: handleRowSelectChange,
                getCheckboxProps: record => ({
                    disabled: record.disabled,
                }),
            }"
            :dataSource="list"
            :columns="columns"
            :pagination="tablePagination"
            @change="handleTableChange"
        />
      </div>
</template>

<script>
import { Alert, Table } from "ant-design-vue";
export default {
  name: "StandardTable",
  components: {
    Alert,
    Table // eslint-disable-line
  },
  props: {
    pagination: {
      type: Object,
      default: () => {
        {
        }
      }
    },
    onChange: {
      type: Function,
      default: () => {}
    },
    onSelectRow: {
      type: Function,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => {
        [];
      }
    },
    list: {
      type: Array,
      default: () => {
        [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: ""
    }
  },
  computed: {
    tablePagination() {
      return {
        showSizeChanger: true,
        showQuickJumper: true,
        ...this.pagination
      };
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      needTotalList: this.initTotalList(this.columns)
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      this.onChange(pagination, filters, sorter);
    },
    cleanSelectedKeys() {
      this.handleRowSelectChange([], []);
    },
    handleRowSelectChange(selectedRowKeys, selectedRows) {
      let needTotalList = [...this.needTotalList];
      needTotalList = needTotalList.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            return sum + parseFloat(val[item.dataIndex], 10);
          }, 0)
        };
      });

      if (this.onSelectRow) {
        this.onSelectRow(selectedRows);
      }
      this.selectedRowKeys = selectedRowKeys;
      this.needTotalList = needTotalList;
    },
    initTotalList(columns) {
      const totalList = [];
      columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({ ...column, total: 0 });
        }
      });
      return totalList;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
