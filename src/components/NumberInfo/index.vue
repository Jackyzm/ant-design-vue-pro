<template>
    <div :class="'numberInfo '+(theme? 'numberInfo'+theme :'')" :style="numberInfoStyle">
        <div v-if="title" class='numberInfoTitle'>{{ title }}</div>
        <div v-if="subTitle" class="numberInfoSubTitle">{{ subTitle }}</div>
        <slot name="subTitle" />
        <div class="numberInfoValue" :style="gap ? 'margin-top: '+gap+'px;' : null">
            <span>
                {{ total }}
                <slot name="total" />
                <em v-if="suffix" class="suffix">{{ suffix }}</em>
            </span>
            <span v-if="status || subTotal" class="subTotal">
                {{ subTotal }}
                <a-icon v-if="status" :type="'caret-'+status" />
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: "NumberInfo",
  props: {
    theme: {
      type: String
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    gap: {
      type: Number
    },
    total: {
      type: String
    },
    suffix: {
      type: String
    },
    status: {
      type: String
    },
    subTotal: {
      type: Number
    },
    numberInfoStyle: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
