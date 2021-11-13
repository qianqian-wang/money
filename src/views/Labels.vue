<template>
  <Layout>
    <div class="label">
      <router-link
        class="tags"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tags"
        :key="tag.id"
      >
        <span>{{ tag.name }}</span>
        <icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <buttons class="createTag" @click.native="createTag">新建标签</buttons>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Buttons from "@/components/Buttons.vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

@Component({
  components: { Buttons },
})
export default class Labels extends Vue {
  tags =window.tagList;

  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("该标签已存在");
      } else if (message === "success") {
        window.alert("添加成功");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  background: white;
  font-size: 16px;

  > .tags {
    border-bottom: 1px solid #bcbbc1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 10px 15px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
}
.createTag-wrapper {
  text-align: center;
  margin-top: 44-16px;
}
</style>
