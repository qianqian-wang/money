<template>
  <Layout classPrefix="layout">
    <number-pad :value.sync="record.number" @submit="saveRecord" />
    <Tabs
      :dataSource="recordTypeList"
      classPrefix="type"
      :value.sync="record.type"
    />
    <FormItem
      @update:value="onUpdateNotes"
      fieldName="请输入备注信息"
      placeholder="备注"
    />
    <tags @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { NumberPad, FormItem, Tags, Tabs },
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  record: RecordItem = {
    type: "-",
    notes: "",
    number: 0,
    tag: [],
  };
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecord");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTags(value: []) {
    this.record.tag = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
