<template>
    <div>
        <span v-if="text.length <= length || length < 0">{{ text }}</span>
        <a-tooltip v-else-if="tooltip" :overlayStyle="{ wordBreak: 'break-all' }" :title="text">
            <template slot="title">
                <slot name="text" />
            </template>
            <span>
                {{ displayText }}
                {{ tail }}
            </span>
        </a-tooltip>
        <span v-else>
            {{ displayText }}
            {{ tail }}
        </span>
    </div>
</template>

<script>
export default {
  name: "EllipsisText",
  props: {
    className: {
      type: String,
      default: ""
    },
    length: {
      type: Number
    },
    text: {
      type: String,
      default: ""
    },
    tooltip: {
      type: Boolean
    }
  },
  mounted() {
    let displayText;
    if (length - tail.length <= 0) {
      displayText = "";
    } else {
      displayText = text.slice(0, length);
    }
    this.displayText = displayText;
  },
  data() {
    return {
      tail: "..."
    };
  }
};
</script>
