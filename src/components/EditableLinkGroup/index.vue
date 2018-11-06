<template>
    <div class="linkGroup">
        <a v-for="link in links" :key="`linkGroup-item-${link.id || link.title}`">{{ link.title }}</a>
        <a-button size="small" type="primary" ghost @click="onAdd" icon="plus">
            添加
        </a-button>
    </div>
</template>

<script>
export default {
  name: "EditableLinkGroup",
  props: {
    links: {
      type: Array,
      default: () => {
        [];
      }
    },
    onAdd: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
