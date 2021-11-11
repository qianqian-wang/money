<template>
  <Layout>
    <ul class="label">
      <li v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <icon name="right" />
      </li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

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

  > li {
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
.createTag {
  background: #767676;
  border-radius: 4px;
  color: white;
  padding: 9px 16px;
  border: none;
  &-wrapper {
    text-align: center;
    margin-top: 44-16px;
  }
}
</style>
