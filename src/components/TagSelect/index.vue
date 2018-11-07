<template>
    <div :class="cls" :style="tagSelectStyle">
        <a-checkable-tag :checked="checkedAll" key="tag-select-__all__" @change="onSelectAll">
          全部
        </a-checkable-tag>
        <TagSelectOption v-for="item in option" :key="`tag-select-${item.value}`" :checked="value.indexOf(item.value) > -1" :onChange="handleTagChange" :value="item.value">{{ item.text }}</TagSelectOption>
        <a v-if="expandable" class="trigger" @click="handleExpand">
            {{ expand ? '收起' : '展开' }} <a-icon :type="expand ? 'up' : 'down'" />
        </a>
    </div>
</template>

<script>
import TagSelectOption from "./TagSelectOption";
export default {
  name: "TagSelect",
  components: {
    TagSelectOption
  },
  props: {
    expandable: {
      type: Boolean
    },
    tagSelectStyle: {
      type: String
    },
    className: {
      type: String,
      default: ""
    },
    option: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  computed: {
    cls() {
      return `tagSelect ${this.className} ${
        this.expandable ? "hasExpandTag" : ""
      } ${this.expand ? "expanded" : ""}`;
    },
    checkedAll() {
      return this.getAllTags().length === this.value.length;
    }
  },
  mounted() {},
  data() {
    return {
      expand: false,
      value: []
    };
  },
  methods: {
    handleExpand() {
      this.expand = !this.expand;
    },
    onSelectAll(checked) {
      let checkedTags = [];
      if (checked) {
        checkedTags = this.getAllTags();
      }
      this.onChange(checkedTags);
    },
    onChange(value) {
      this.value = value;
      if (this.$listeners.change) {
        this.$listeners.change(value);
      }
    },
    handleTagChange(value, checked) {
      const checkedTags = [...this.value];

      const index = checkedTags.indexOf(value);
      if (checked && index === -1) {
        checkedTags.push(value);
      } else if (!checked && index > -1) {
        checkedTags.splice(index, 1);
      }
      this.onChange(checkedTags);
    },
    getAllTags() {
      if (!this.option) return [];
      return this.option.map(item => {
        return item.value;
      });
      // let { children } = this.props;
      // children = React.Children.toArray(children);
      // const checkedTags = children
      //   .filter(child => this.isTagSelectOption(child))
      //   .map(child => child.props.value);
      // return checkedTags || [];
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
