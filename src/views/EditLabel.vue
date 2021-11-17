<template>
  <layout>
    <div class="navBar">
      <icon name="left" @click.native="goBack" />
      <span class="title"> 编辑标签 </span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="removes">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import FormItem from "@/components/Money/FormItem.vue";
import store from "@/store/index2";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "../components/Buttons.vue";
@Component({ components: { FormItem, Button } })
export default class Test extends Vue {
  tag?: { id: string; name: string } = undefined;

  created() {
    this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) store.updateTag(this.tag.id, name);
  }
  removes() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
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
