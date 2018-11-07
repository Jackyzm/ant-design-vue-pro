<template>
    <div :class="`result ${className}`">
        <div class="icon">
            <a-icon v-if="type=='success'" class="success" type="check-circle" />
            <a-icon v-if="type=='error'" class="error" type="close-circle" />
        </div>
        <div v-if="title || $slots.title" class="title">
            {{ title }}
            <slot name="title" />
        </div>
        <div v-if="description || $slots.description" class="description">
            {{ description }}
            <slot name="description" />
        </div>
        <div v-if="extra || $slots.extra" class="extra">
            {{ extra }}
            <slot name="extra" />
        </div>
        <div v-if="actions || $slots.actions" class="actions">
            {{ actions }}
            <slot name="actions" />
        </div>
    </div>
</template>

<script>
export default {
  name: "Result",
  props: {
    className: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    extra: {
      type: String,
      default: ""
    },
    actions: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
