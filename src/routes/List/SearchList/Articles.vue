<template>
    <div>
        <a-card :bordered="false">
            <a-form layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                <StandardFormRow title="所属类目" block styles="padding-bottom: 11px;">
                    <a-form-item fieldDecoratorId="category">
                        <TagSelect @change="handleFormSubmit" expandable :option="selectArr" />
                    </a-form-item>
                </StandardFormRow>
                <StandardFormRow title="owner" grid>
                    <a-row>
                        <a-col :lg="16" :md="24" :sm="24" :xs="24">
                            <a-form-item
                                fieldDecoratorId="owner"
                                :fieldDecoratorOptions="{
                                    initialValue: ['wjh', 'zxx'],
                                }"
                            >
                                <a-select
                                    mode="multiple"
                                    style="max-width: 286px; width: 100%;"
                                    placeholder="选择 owner"
                                >
                                    <a-select-option v-for="owner in owners" :key="owner.id" :value="owner.id">
                                        {{ owner.name }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a class="selfTrigger" @click="setOwner">
                                只看自己的
                            </a>
                        </a-col>
                    </a-row>
                </StandardFormRow>
                <StandardFormRow title="其它选项" grid last>
                    <a-row :gutter="16">
                        <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
                            <a-form-item
                                v-bind="formItemLayout"
                                label="活跃用户"
                                fieldDecoratorId="user"
                            >
                                <a-select
                                    @change="handleFormSubmit"
                                    placeholder="不限"
                                    style="max-width: 200px; width: 100%;"
                                >
                                    <a-select-option value="lisa">李三</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
                            <a-form-item
                                v-bind="formItemLayout"
                                label="好评度"
                                fieldDecoratorId="rate"
                            >
                                <a-select
                                    @change="handleFormSubmit"
                                    placeholder="不限"
                                    style="max-width: 200px; width: 100%;"
                                >
                                    <a-select-option value="good">优秀</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </StandardFormRow>
            </a-form>
        </a-card>
        <a-card
            style="margin-top: 24px;"
            :bordered="false"
            :bodyStyle="{ padding: '8px 32px 32px 32px' }"
        >
            <a-list
                size="large"
                :loading="loading"
                rowKey="id"
                itemLayout="vertical"
                :dataSource="list"
            >
                <template slot="loadMore">
                    <div v-if="list.length > 0" style="text-align: center; margin-top: 16px;">
                        <a-button @click="fetchMore" style="padding: 0 48px;">
                            <span v-if="loading">
                                <a-icon type="loading" /> 加载中...
                            </span>
                            <span v-else>加载更多</span>
                        </a-button>
                    </div>
                </template>
                <template slot="renderItem" slot-scope="item">
                    <a-list-item :key="item.id">
                        <template slot="actions">
                            <span>
                                <a-icon type="star-o" style="margin-right: 8px;" />
                                {{ item.star }}
                            </span>
                        </template>
                        <template slot="actions">
                            <span>
                                <a-icon type="like-o" style="margin-right: 8px;" />
                                {{ item.like }}
                            </span>
                        </template>
                        <template slot="actions">
                            <span>
                                <a-icon type="message" style="margin-right: 8px;" />
                                {{ item.message }}
                            </span>
                        </template>
                        <template slot="extra">
                            <div class="listItemExtra" />
                        </template>
                        <a-list-item-meta>
                            <template slot="title">
                                <a class="listItemMetaTitle" :href="item.href">
                                    {{ item.title }}
                                </a>
                            </template>
                            <template slot="description">
                                <span>
                                    <a-tag>Ant Design</a-tag>
                                    <a-tag>设计语言</a-tag>
                                    <a-tag>蚂蚁金服</a-tag>
                                </span>
                            </template>
                        </a-list-item-meta>
                        <div class="listContent">
                            <div class="description">{{ item.content }}</div>
                            <div class="extra">
                                <a-avatar :src="item.avatar" size="small" />
                                <a :href="item.href">{{ item.owner }}</a> 发布在 <a :href="item.href">{{ item.href }}</a>
                                <em>{{ moment(item.updatedAt).format('YYYY-MM-DD HH:mm') }}</em>
                            </div>
                        </div>
                    </a-list-item>
                </template>
            </a-list>
        </a-card>
    </div>
</template>

<script>
import StandardFormRow from "@/components/StandardFormRow";
import TagSelect from "@/components/TagSelect";
import moment from "moment";
export default {
  name: "Articles",
  components: {
    TagSelect,
    StandardFormRow
  },
  mounted() {
    this.$store.dispatch("fakeList/getList", { params: { count: 5 } });
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
    const owners = [
      {
        id: "wzj",
        name: "我自己"
      },
      {
        id: "wjh",
        name: "吴家豪"
      },
      {
        id: "zxx",
        name: "周星星"
      },
      {
        id: "zly",
        name: "赵丽颖"
      },
      {
        id: "ym",
        name: "姚明"
      }
    ];
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
      formItemLayout: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          md: { span: 12 }
        }
      },
      owners,
      moment,
      selectArr
    };
  },
  methods: {
    handleFormSubmit() {
      setTimeout(() => {
        this.form.validateFields(err => {
          if (!err) {
            this.$store.dispatch("fakeList/getList", { params: { count: 5 } });
          }
        });
      }, 0);
    },
    setOwner() {
      this.form.setFieldsValue({
        owner: ["wzj"]
      });
    },
    fetchMore() {
      this.$store.dispatch("fakeList/getMoreList", { params: { count: 5 } });
    }
  }
};
</script>

<style lang="less">
@import "./Articles.less";
</style>

