<template>
    <PageHeaderLayout
        title="搜索列表"
        :tabList="tabList"
        :tabActiveKey="$route.path.replace(`${this.$route.matched[1].path}/`, '')"
        :onTabChange="handleTabChange"
    >
        <template slot="content">
            <div style="text-align: center;">
                <Search
                    placeholder="请输入"
                    enterButton="搜索"
                    size="large"
                    @search="handleFormSubmit"
                    style="width: 522px;"
                />
            </div>
        </template>
        <router-view />
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import { Input } from "ant-design-vue";
export default {
  name: "SearchList",
  components: {
    PageHeaderLayout,
    Search: Input.Search
  },
  data() {
    const tabList = [
      {
        key: "articles",
        tab: "文章"
      },
      {
        key: "applications",
        tab: "应用"
      },
      {
        key: "projects",
        tab: "项目"
      }
    ];
    return {
      tabList
    };
  },
  methods: {
    handleTabChange(key) {
      switch (key) {
        case "articles":
          this.$router.push(`${this.$route.matched[1].path}/articles`);
          break;
        case "applications":
          this.$router.push(`${this.$route.matched[1].path}/applications`);
          break;
        case "projects":
          this.$router.push(`${this.$route.matched[1].path}/projects`);
          break;
        default:
          break;
      }
    },
    handleFormSubmit() {
      setTimeout(() => {
        this.$store.dispatch("fakeList/getList", { params: { count: 3 } });
      }, 0);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
