<template>
  <layout>
    <div class="navBar">
      <icon name="left" />
      <span class="title"> 编辑标签 </span>
    </div>
    <div class="form-wrapper">
      <FormItem fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <buttons>删除标签</buttons>
    </div>
  </layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import FormItem from "@/components/Money/FormItem.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Buttons from "../components/Buttons.vue";
@Component({ components: { FormItem, Buttons } })
export default class Test extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background: white;
  padding: 15px 0;
  font-size: 16px;
  text-align: center;
  position: relative;
  .icon {
    position: absolute;
    top: 20px;
    left: 5%;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  margin-top: 44-16px;
}
</style>
