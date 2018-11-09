<template>
    <CheckableTag :checked="checked" :key="value" @change="state => this.onChange(this.value, state)">
        <slot />
    </CheckableTag>
</template>

<script>
import { Tag } from "ant-design-vue";
export default {
  name: "TagSelectOption",
  components: {
    CheckableTag: Tag.CheckableTag
  },
  props: {
    checked: {
      type: Boolean
    },
    value: {
      type: String
    },
    onChange: {
      type: Function
    }
  }
};
</script>
