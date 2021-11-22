<template>
  <layout>
    <div class="navBar">
      <icon name="left" @click.native="goBack" />
      <span class="title"> 编辑标签 </span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="currentTag.name"
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
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "../components/Buttons.vue";
@Component({
  components: { FormItem, Button },
})
export default class Test extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTag");
    this.$store.commit("setCurrentTag", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.currentTag)
      this.$store.commit("updateTag", { id: this.currentTag.id, name: name });
  }
  removes() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
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
