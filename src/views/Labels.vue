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
import Buttons from "@/components/Buttons.vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "../mixins/tagHelper";

@Component({
  components: { Buttons },
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTag");
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
