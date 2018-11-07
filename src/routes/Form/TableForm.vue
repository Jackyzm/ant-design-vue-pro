<template>
    <div>
        <a-table
            :loading="loading"
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :rowClassName="record => {
                return 'editable' ? 'editable' : '';
            }"
        />
            <a-button
                style="width: 100%; margin-top: 16px; margin-bottom: 8px;"
                type="dashed"
                @click="newMember"
                icon="plus"
            >
                新增成员
            </a-button>
    </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "TableForm",
  props: {
    value: {
      type: Array
    },
    onChange: {
      type: Function
    }
  },
  created() {
    this.data = this.value;
  },

  watch: {
    // eslint-disable-next-line
    value(val, oldVal) {
      this.data = val;
    }
  },
  data() {
    return {
      loading: false,
      index: 0,
      data: [],
      cacheOriginData: {},
      columns: [
        {
          title: "成员姓名",
          dataIndex: "name",
          key: "name",
          width: "20%",
          customRender: (text, record) => {
            if (record.editable) {
              return (
                <a-input
                  value={text}
                  autoFocus
                  onChange={e => this.handleFieldChange(e, "name", record.key)}
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="成员姓名"
                />
              );
            }
            return text;
          }
        },
        {
          title: "工号",
          dataIndex: "workId",
          key: "workId",
          width: "20%",
          customRender: (text, record) => {
            if (record.editable) {
              return (
                <a-input
                  value={text}
                  onChange={e =>
                    this.handleFieldChange(e, "workId", record.key)
                  }
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="工号"
                />
              );
            }
            return text;
          }
        },
        {
          title: "所属部门",
          dataIndex: "department",
          key: "department",
          width: "40%",
          customRender: (text, record) => {
            if (record.editable) {
              return (
                <a-input
                  value={text}
                  onChange={e =>
                    this.handleFieldChange(e, "department", record.key)
                  }
                  onKeyPress={e => this.handleKeyPress(e, record.key)}
                  placeholder="所属部门"
                />
              );
            }
            return text;
          }
        },
        {
          title: "操作",
          key: "action",
          customRender: (text, record) => {
            if (!!record.editable && this.loading) {
              return null;
            }
            if (record.editable) {
              if (record.isNew) {
                return (
                  <span>
                    <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                      title="是否要删除此行？"
                      onConfirm={() => this.remove(record.key)}
                    >
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                );
              }
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                  <a-divider type="vertical" />
                  <a onClick={e => this.cancel(e, record.key)}>取消</a>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="是否要删除此行？"
                  onConfirm={() => this.remove(record.key)}
                >
                  <a>删除</a>
                </a-popconfirm>
              </span>
            );
          }
        }
      ]
    };
  },
  methods: {
    newMember() {
      const newData = this.data.map(item => ({ ...item }));
      newData.push({
        key: `NEW_TEMP_ID_${this.index}`,
        workId: "",
        name: "",
        department: "",
        editable: true,
        isNew: true
      });
      this.index += 1;
      this.data = newData;
    },
    handleFieldChange(e, fieldName, key) {
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (target) {
        target[fieldName] = e.target.value;
        this.data = newData;
      }
    },
    handleKeyPress(e, key) {
      if (e.key === "Enter") {
        this.saveRow(e, key);
      }
    },
    remove(key) {
      const newData = this.data.filter(item => item.key !== key);
      this.data = newData;
      this.onChange(newData);
    },
    getRowByKey(key, newData) {
      return (newData || this.data).filter(item => item.key === key)[0];
    },
    saveRow(e, key) {
      //   e.persist();
      this.loading = true;
      setTimeout(() => {
        if (this.clickedCancel) {
          this.clickedCancel = false;
          return;
        }
        const target = this.getRowByKey(key) || {};
        if (!target.workId || !target.name || !target.department) {
          message.error("请填写完整成员信息。");
          e.target.focus();
          this.loading = false;
          return;
        }
        delete target.isNew;
        this.toggleEditable(e, key);
        this.onChange(this.data);
        this.loading = false;
      }, 500);
    },
    cancel(e, key) {
      this.clickedCancel = true;
      e.preventDefault();
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (this.cacheOriginData[key]) {
        Object.assign(target, this.cacheOriginData[key]);
        target.editable = false;
        delete this.cacheOriginData[key];
      }
      this.data = newData;
      this.clickedCancel = false;
    },
    toggleEditable(e, key) {
      e.preventDefault();
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (target) {
        // 进入编辑状态时保存原始数据
        if (!target.editable) {
          this.cacheOriginData[key] = { ...target };
        }
        target.editable = !target.editable;
        this.data = newData;
      }
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
