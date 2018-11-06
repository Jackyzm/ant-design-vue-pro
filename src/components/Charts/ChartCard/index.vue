<template>
    <a-card :bodyStyle="{padding: '20px 24px 8px 24px'}" :bordered="bordered">
        <a-spin :spinning="loading" wrapperClassName="spin">
            <div class="chartCard">
                <div class="chartTop">
                    <div v-if="avatar" class="avatar">{{ avatar }}</div>
                    <div class="metaWrap">
                        <div class="meta">
                            <span class="title">{{ title }}</span>
                            <span class="action">
                                <slot name="action" />
                            </span>
                        </div>
                        <div class="total">
                            <slot name="total" />
                        </div>
                    </div>
                </div>
                <div class="content" :style="'height: '+contentHeight+'px'">
                    <div class="contentFixed">
                        <slot name="content" />
                    </div>
                </div>
                <div class="footer">
                    <slot name="footer" />
                </div>
            </div>
        </a-spin>
    </a-card>
</template>

<script>
export default {
  name: "ChartCard",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    bordered: {
      type: Boolean,
      default: true
    },
    contentHeight: {
      type: Number
    },
    avatar: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
