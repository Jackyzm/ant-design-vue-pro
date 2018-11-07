<template>
    <a-checkable-tag :checked="checked" :key="value" @change="state => this.onChange(this.value, state)">
        <slot />
    </a-checkable-tag>
</template>

<script>
export default {
  name: "TagSelectOption",
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
