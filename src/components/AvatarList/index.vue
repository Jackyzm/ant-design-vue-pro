<template>
    <div class="avatarList">
        <ul>
            <li :class="cls" @click="onClick" v-for="(member, i) in members" :key="`${member.id}-avatar-${i}`">
                <a-tooltip v-if="member.name" :title="member.name">
                    <a-avatar :src="member.avatar" :size="size" style="cursor: pointer;" />
                </a-tooltip>
                <a-avatar v-else :src="member.avatar" :size="size" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "AvatarList",
  props: {
    members: {
      type: Array
    },
    size: {
      type: String,
      default: ""
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    cls() {
      return `avatarItem ${this.size === "large" ? "avatarItemLarge" : ""} ${
        this.size === "small" ? "avatarItemSmall" : ""
      } ${this.size === "mini" ? "avatarItemMini" : ""}`;
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
