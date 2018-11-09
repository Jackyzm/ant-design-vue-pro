<template>
    <div class="avatarList">
        <ul>
            <li :class="cls" @click="onClick" v-for="(member, i) in members" :key="`${member.id}-avatar-${i}`">
                <Tooltip v-if="member.name" :title="member.name">
                    <Avatar :src="member.avatar" :size="size" style="cursor: pointer;" />
                </Tooltip>
                <Avatar v-else :src="member.avatar" :size="size" />
            </li>
        </ul>
    </div>
</template>

<script>
import { Tooltip, Avatar } from "ant-design-vue";
export default {
  name: "AvatarList",
  components: {
    Tooltip,
    Avatar
  },
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
