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
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const recordList = recordListModel.fetch();
tagListModel.fetch();

@Component({
  components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
  tags = tagListModel.data;
  placeholder = "请输入备注信息";
  recordList: RecordItem[] = recordList;
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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    this.placeholder = "请输入备注信息";

    console.log(this.placeholder);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
