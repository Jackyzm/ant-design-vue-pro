<template>
    <div class="globalFooter">
        <div class="links" v-if="links">
            <a v-for="link in links" :key="link.key" :target="link.blankTarget ? '_blank' : '_self'" :href="link.href">
                <span v-if="link.title != 'github'">{{ link.title }}</span>
                <span v-else=""><a-icon :type="link.title" /></span>
            </a>
        </div>
        <div v-if="$slots.copyright" class="copyright">
            <slot name="copyright" />
        </div>
        <div v-else class="copyright">Copyright <a-icon type="copyright" /> 2018 蚂蚁金服体验技术部出品</div>
    </div>
</template>
<script>
export default {
  name: "GlobalFooter",
  props: {
    links: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

