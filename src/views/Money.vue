<template>
  <Layout classPrefix="layout">
    <number-pad :value.sync="record.number" />
    <types :value.sync="record.type" />
    <notes @update:value="onUpdateNotes" />
    <tags :dataSource.sync="tags" @update:value="onUpdateTags" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Component from "vue-class-component";

type Record = {
  type: string;
  notes: string;
  number: number;
  tag: string[];
};
@Component({
  components: { NumberPad, Types, Notes, Tags },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
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
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped></style>
