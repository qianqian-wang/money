<template>
  <Layout classPrefix="layout">
    <number-pad :value.sync="record.number" @submit="saveRecord" />
    <types :value.sync="record.type" />
    <FormItem
      @update:value="onUpdateNotes"
      fieldName="备注"
      :placeholder="placeholder"
    />
    <tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
  tags = window.tagList;
  placeholder = "请输入备注信息";
  recordList = window.recordList;
  record: RecordItem = {
    type: "-",
    notes: "",
    number: 0,
    tag: [],
  };
  onUpdateTags(value: string[]) {
    this.record.tag = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    window.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
