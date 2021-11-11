<template>
  <layout>
    <div class="subject">
      <icon name="left" />
      <span class="sub"> 编辑标签 </span>
    </div>
    <notes
      @update:value="onUpdateNotes"
      fieldName="标签名"
      placeholder="请输入标签名"
    />
  </layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import Notes from "@/components/Money/Notes.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({ components: { Notes } })
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
.subject {
  background: white;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .svg {
    margin-left: -20px;
  }
}
</style>
