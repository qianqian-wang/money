<template>
  <Layout classPrefix="layout">
    <number-pad :value.sync="record.number" @submit="saveRecord" />
    <types :value.sync="record.type" />
    <FormItem
      @update:value="onUpdateNotes"
      fieldName="请输入备注信息"
      :placeholder="placeholder"
    />
    <tags />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import store from "@/store/index2";

@Component({
  components: { NumberPad, Types, FormItem, Tags },
  computed: {
    recordList() {
      store.recordList;
    },
  },
})
export default class Money extends Vue {
  record: RecordItem = {
    type: "-",
    notes: "",
    number: 0,
    tag: [],
  };
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    store.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
