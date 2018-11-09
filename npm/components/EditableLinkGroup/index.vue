<template>
    <div class="linkGroup">
        <a v-for="link in links" :key="`linkGroup-item-${link.id || link.title}`">{{ link.title }}</a>
        <Botton size="small" type="primary" ghost @click="onAdd" icon="plus">
            添加
        </Botton>
    </div>
</template>

<script>
import { Botton } from "ant-design-vue";
export default {
  name: "EditableLinkGroup",
  components: {
    Botton
  },
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
