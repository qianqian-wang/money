<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
        :value="selectedTags"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagHelper } from "@/mixins/tagHelper";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop() readonly selectedTags!: string[];
  // selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit("fetchTag");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
    console.log(this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;
  .current {
    display: flex;
    flex-wrap: wrap;
    li {
      $bg: #d9d9d9;
      background: $bg;
      min-height: 24px;
      line-height: 24px;
      word-break: break-all;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 2px;
      &.selected {
        background: darken($color: $bg, $amount: 20%);
        color: white;
      }
    }
  }
  .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
