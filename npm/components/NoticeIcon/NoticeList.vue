<template>
    <div>
        <div v-if="data && data.length > 0">
            <List class="list">
                <ListItem v-for="item in data" :class="'item '+ (item.read?'read':'')" :key="item.key || i" @click="() => onClick(item)">
                    <ListItemMeta class="meta">
                        <template slot="title">
                            <div class="title">
                                {{ item.title }}
                                <div class="extra">
                                    <Tag v-if="item.extra && item.status" :color="getColor(item.status)" style="margin-right: 0">{{ item.extra }}</Tag>
                                </div>
                            </div>
                        </template>
                        <template slot="description">
                            <div>
                                <div class='description' :title="item.description">
                                    {{ item.description }}
                                </div>
                                <div class="datetime">{{ item.datetime }}</div>
                            </div>
                        </template>
                        <template v-if="item.avatar" slot="avatar">
                            <Avatar class="avatar" :src="item.avatar" />
                        </template>
                    </ListItemMeta>
                </ListItem>
            </List>
            <div class='clear' @click="onClear">
                {{ locale.clear }}
                {{ title }}
            </div>
        </div>
        <div v-else>
            <div class='notFound'>
                <img v-if="emptyImage" :src="emptyImage" alt="not found" />
                <div v-if="emptyText">{{ emptyText }}</div>
                <div v-else-if="locale.emptyText">{{ locale.emptyText }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { List, Avatar, Tag } from "ant-design-vue";
export default {
  name: "NoticeList",
  components: {
    List,
    ListItem: List.Item,
    ListItemMeta: List.Item.Meta,
    Avatar,
    Tag
  },
  props: {
    locale: {
      type: Object
    },
    onClear: {
      type: Function
    },
    onClick: {
      type: Function
    },
    data: {
      type: Array
    },
    title: {
      type: String
    },
    emptyImage: {
      type: String
    },
    emptyText: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    getColor(status) {
      let color = "";
      switch (status) {
        case "todo":
          break;
        case "processing":
          color = "blue";
          break;
        case "urgent":
          color = "red";
          break;
        case "doing":
          color = "gold";
          break;
        default:
          return;
      }
      return color;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./NoticeList.less";
</style>
