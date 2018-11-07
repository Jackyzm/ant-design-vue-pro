<template>
    <div class="coverCardList">
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
        <div class="cardList">
            <a-list
                v-if="list"
                rowKey="id"
                :loading="loading"
                :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
                :dataSource="list"
            >
                <template slot="renderItem" slot-scope="item">
                    <a-list-item>
                        <a-card class="card" hoverable>
                            <template slot="cover">
                                <img :alt="item.title" :src="item.cover" height="154px" />
                            </template>
                            <a-card-meta>
                                <a href="#" slot="title">{{ item.title }}</a>
                                <Ellipsis slot="description" :lines="2">{{ item.subDescription }}</Ellipsis>
                            </a-card-meta>
                            <div class="cardItemContent">
                                <span>{{ moment(item.updatedAt).fromNow() }}</span>
                                <div class="avatarList">
                                    <AvatarList size="small" :members="item.members" />
                                </div>
                            </div>
                        </a-card>
                    </a-list-item>
                </template>
            </a-list>
        </div>
    </div>
</template>

<script>
import StandardFormRow from "@/components/StandardFormRow";
import TagSelect from "@/components/TagSelect";
import Ellipsis from "@/components/Ellipsis";
import AvatarList from "@/components/AvatarList";
import moment from "moment";
export default {
  name: "Projects",
  components: {
    StandardFormRow,
    TagSelect,
    Ellipsis,
    AvatarList
  },
  mounted() {
    this.$store.dispatch("fakeList/getList", { params: { count: 8 } });
  },
  computed: {
    list() {
      return this.$store.state.fakeList.list;
    },
    loading() {
      return this.$store.state.fakeList.loading;
    }
  },
  destroyed() {
    this.$store.dispatch("fakeList/clearList");
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
      formItemLayout: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      selectArr
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

<style lang="less">
@import "./Projects.less";
</style>

