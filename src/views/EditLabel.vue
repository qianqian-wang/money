<template>
  <layout>
    <div class="navBar">
      <icon name="left" @click.native="goBack"/>
      <span class="title"> 编辑标签 </span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button @click="removes">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import FormItem from "@/components/Money/FormItem.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "../components/Buttons.vue";
@Component({ components: { FormItem, Button } })
export default class Test extends Vue {
  tag?:{id:string,name:string}=undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag=tag
    } else {
      this.$router.replace("/404");
    }
  }
  update(name:string){
    if(this.tag)tagListModel.update(this.tag.id,name);
  }
  removes(){
    console.log('shanchu???????')
     if(this.tag)tagListModel.remove(this.tag.id);
  }
  goBack(){
     console.log('shanchu???????')
    this.$router.back()
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
