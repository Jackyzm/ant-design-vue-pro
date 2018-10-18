<template>
    <div class="globalFooter">
        <div class="links" v-if="links">
            <a v-for="link in links" :key="link.key" :target="link.blankTarget ? '_blank' : '_self'" :href="link.href" >
                <span v-if="link.title != 'github'">{{link.title}}</span>
                <span v-else=""><a-icon :type="link.title"/></span>
            </a>
        </div>
        <div class="copyright">Copyright <a-icon type="copyright" /> 2018 蚂蚁金服体验技术部出品</div>
    </div>
</template>
<script>
export default {
  name: "GlobalFooter",
  data() {
    return {
      links: [
        {
          key: "Pro 首页",
          title: "Pro 首页",
          href: "http://pro.ant.design",
          blankTarget: true
        },
        {
          key: "github",
          title: "github",
          href: "https://github.com/ant-design/ant-design-pro",
          blankTarget: true
        },
        {
          key: "Ant Design",
          title: "Ant Design",
          href: "http://ant.design",
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

