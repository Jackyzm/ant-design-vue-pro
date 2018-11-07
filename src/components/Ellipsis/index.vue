<template>
    <div>
        <span v-if="!lines && !length"> <slot /> </span>
        <EllipsisText
            v-else-if="!lines"
            :className="cls"
            :length="length"
            :text="children || ''"
            :tooltip="tooltip"
        />
        <div v-else-if="isSupportLineClamp" :id="id" :class="cls">
            <a-tooltip v-if="tooltip" :overlayStyle="{ wordBreak: 'break-all' }">
                <template slot="title">
                    <slot />
                </template>
                <slot />
            </a-tooltip>
            <slot v-else />
        </div>
        <div v-else ref="handleRoot" :class="cls">
            <div ref="handleContent">
                    <a-tooltip v-if="tooltip" :overlayStyle="{ wordBreak: 'break-all' }" :title="text">
                        <span ref="handleNode">
                            {{ targetCount > 0 && text.substring(0, targetCount) }}
                            {{ targetCount > 0 && (targetCount < text.length) && '...' }} <!-- eslint-disable-line -->
                        </span>
                    </a-tooltip>
                    <span ref="handleNode">
                        {{ targetCount > 0 && text.substring(0, targetCount) }}
                        {{ targetCount > 0 && targetCount < text.length && '...' }} <!-- eslint-disable-line -->
                    </span>
                <div class="shadow" ref="handleShadowChildren">
                    <slot />
                </div>
                <div class="shadow" ref="handleShadow">
                    <span>{{ text }}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import EllipsisText from "./EllipsisText";
export default {
  name: "Ellipsis",
  components: {
    EllipsisText
  },
  props: {
    tooltip: {
      type: Boolean
    },
    length: {
      type: Number
    },
    lines: {
      type: Number
    },
    className: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.computeLine();
  },
  watch: {
    lines() {
      this.computeLine();
    }
  },
  computed: {
    cls() {
      return `ellipsis ${this.className} ${
        this.lines && !this.isSupportLineClamp ? "lines" : ""
      } ${this.lines && this.isSupportLineClamp ? "lineClamp" : ""}`;
    }
  },
  data() {
    const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(
      Math.random() * 100
    )}`}`;
    const style = `#${id}{-webkit-line-clamp:${
      this.lines
    };-webkit-box-orient: vertical;}`;
    return {
      isSupportLineClamp: document.body.style.webkitLineClamp !== undefined,
      id,
      style,
      text: "",
      targetCount: 0
    };
  },
  methods: {
    computeLine() {
      if (this.lines && !this.isSupportLineClamp) {
        const text = this.shadowChildren.innerText;
        const lineHeight = parseInt(getComputedStyle(this.root).lineHeight, 10);
        const targetHeight = lines * lineHeight;
        this.content.style.height = `${targetHeight}px`;
        const totalHeight = this.shadowChildren.offsetHeight;
        const shadowNode = this.shadow.firstChild;

        if (totalHeight <= targetHeight) {
          this.text = text;
          this.targetCount = text.length;
          return;
        }

        // bisection
        const len = text.length;
        const mid = Math.floor(len / 2);

        const count = this.bisection(
          targetHeight,
          mid,
          0,
          len,
          text,
          shadowNode
        );
        this.text = text;
        this.targetCount = count;
      }
    },
    bisection(th, m, b, e, text, shadowNode) {
      const suffix = "...";
      let mid = m;
      let end = e;
      let begin = b;
      shadowNode.innerHTML = text.substring(0, mid) + suffix;
      let sh = shadowNode.offsetHeight;

      if (sh <= th) {
        shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
        sh = shadowNode.offsetHeight;
        if (sh > th) {
          return mid;
        } else {
          begin = mid;
          mid = Math.floor((end - begin) / 2) + begin;
          return this.bisection(th, mid, begin, end, text, shadowNode);
        }
      } else {
        if (mid - 1 < 0) {
          return mid;
        }
        shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
        sh = shadowNode.offsetHeight;
        if (sh <= th) {
          return mid - 1;
        } else {
          end = mid;
          mid = Math.floor((end - begin) / 2) + begin;
          return this.bisection(th, mid, begin, end, text, shadowNode);
        }
      }
    },
    handleRoot(n) {
      this.root = n;
    },

    handleContent(n) {
      this.content = n;
    },

    handleNode(n) {
      this.node = n;
    },

    handleShadow(n) {
      this.shadow = n;
    },

    handleShadowChildren(n) {
      this.shadowChildren = n;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
