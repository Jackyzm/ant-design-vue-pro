<template>
    <div class="filterCardList">
        <a-card :bordered="false">
            <a-form layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                <StandardFormRow title="所属类目" block style="padding-bottom: 11px;">
                    <a-form-item fieldDecoratorId="category">
                        <TagSelect @change="handleFormSubmit" expandable :option="selectArr" />
                    </a-form-item>
                </StandardFormRow>
                <StandardFormRow title="其它选项" grid last>
                    <a-row :gutter="16">
                        <a-col :lg="8" :md="10" :sm="10" :xs="24">
                        <a-form-item v-bind="formItemLayout" label="作者" fieldDecoratorId="author">
                            <a-select
                                :onChange="handleFormSubmit"
                                placeholder="不限"
                                style="max-width: 200px; width: 100%;"
                            >
                                <a-select-option value="lisa">王昭君</a-select-option>
                            </a-select>
                        </a-form-item>
                        </a-col>
                        <a-col :lg="8" :md="10" :sm="10" :xs="24">
                            <a-form-item v-bind="formItemLayout" label="好评度" fieldDecoratorId="rate">
                                <a-select
                                    :onChange="handleFormSubmit"
                                    placeholder="不限"
                                    style="max-width: 200px; width: 100%;"
                                >
                                    <a-select-option value="good">优秀</a-select-option>
                                    <a-select-option value="normal">普通</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </StandardFormRow>
            </a-form>
        </a-card>
        <a-list
          rowKey="id"
          style="margin-top: 24px;"
          :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
          :loading="loading"
          :dataSource="list"
        >
            <template slot="renderItem" slot-scope="item">
                <a-list-item :key="item.id">
                    <a-card hoverable :bodyStyle="{ paddingBottom: 20 }">
                        <template slot="actions">
                            <a-tooltip title="下载">
                                <a-icon type="download" />
                            </a-tooltip>
                        </template>
                        <template slot="actions">
                            <a-tooltip title="编辑">
                                <a-icon type="edit" />
                            </a-tooltip>
                        </template>
                        <template slot="actions">
                            <a-tooltip title="分享">
                                <a-icon type="share-alt" />
                            </a-tooltip>
                        </template>
                        <template slot="actions">
                            <a-dropdown>
                                <template slot="overlay">
                                    <a-menu>
                                        <a-menu-item>
                                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                                1st menu item
                                            </a>
                                        </a-menu-item>
                                        <a-menu-item>
                                            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                                                2nd menu item
                                            </a>
                                        </a-menu-item>
                                        <a-menu-item>
                                            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                                                3d menu item
                                            </a>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <a-icon type="ellipsis" />
                            </a-dropdown>
                        </template>

                        <a-card-meta :title="item.title">
                            <a-avatar slot="avatar" size="small" :src="item.avatar" />
                        </a-card-meta>
                        <div class="cardItemContent">
                            <!-- <CardInfo
                                activeUser={formatWan(item.activeUser)}
                                newUser={numeral(item.newUser).format('0,0')}
                            /> -->
                            <div class="cardInfo">
                                <div>
                                    <p>活跃用户</p>
                                    <p>
                                        <span v-if="item.activeUser>10000">
                                            {{ Math.floor(item.activeUser / 10000) }}
                                            <em class="wan">万</em>
                                        </span>
                                        <span v-else>{{ item.activeUser }}</span>
                                    </p>
                                </div>
                                    <div>
                                    <p>新增用户</p>
                                    <p>{{ numeral(item.newUser).format('0,0') }}</p>
                                </div>
                            </div>
                        </div>
                    </a-card>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<script>
import StandardFormRow from "@/components/StandardFormRow";
import TagSelect from "@/components/TagSelect";
import moment from "moment";
import numeral from "numeral";
export default {
  name: "Applications",
  components: {
    StandardFormRow,
    TagSelect
  },
  mounted() {
    this.$store.dispatch("fakeList/getList", { params: { count: 8 } });
  },
  destroyed() {
    this.$store.dispatch("fakeList/clearList");
  },
  computed: {
    list() {
      return this.$store.state.fakeList.list;
    },
    loading() {
      return this.$store.state.fakeList.loading;
    }
  },
  data() {
    const selectArr = [
      { value: "cat1", text: "类目一" },
      { value: "cat2", text: "类目二" },
      { value: "cat3", text: "类目三" },
      { value: "cat4", text: "类目四" },
      { value: "cat5", text: "类目五" },
      { value: "cat6", text: "类目六" },
      { value: "cat7", text: "类目七" },
      { value: "cat8", text: "类目八" },
      { value: "cat9", text: "类目九" },
      { value: "cat10", text: "类目十" },
      { value: "cat11", text: "类目十一" },
      { value: "cat12", text: "类目十二" }
    ];
    return {
      moment,
      numeral,
      selectArr,
      formItemLayout: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
    };
  },
  methods: {
    handleFormSubmit() {
      // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
      setTimeout(() => {
        this.form.validateFields(err => {
          if (!err) {
            this.$store.dispatch("fakeList/getList", { params: { count: 8 } });
          }
        });
      }, 0);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./Applications.less";
</style>

