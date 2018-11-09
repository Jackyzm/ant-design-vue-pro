<template>
    <div class="globalFooter">
        <div class="links" v-if="links">
            <a v-for="link in links" :key="link.key" :target="link.blankTarget ? '_blank' : '_self'" :href="link.href">
                <span v-if="link.title != 'github'">{{ link.title }}</span>
                <span v-else=""><Icon :type="link.title" /></span>
            </a>
        </div>
        <div class="copyright">Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品</div>
    </div>
</template>
<script>
import { Icon } from "ant-design-vue";
export default {
  name: "GlobalFooter",
  components: {
    Icon
  },
  data() {
    return {
      links: [
        {
          key: "Pro 首页",
          title: "Pro 首页",
          href: "https://github.com/Jackyzm/ant-design-vue-pro",
          blankTarget: true
        },
        {
          key: "github",
          title: "github",
          href: "https://github.com/Jackyzm/ant-design-vue-pro",
          blankTarget: true
        },
        {
          key: "Ant Design Vue",
          title: "Ant Design Vue",
          href:
            "https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/",
          blankTarget: true
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

