<template>
  <div>
    <Layout>
      <Tabs :dataSource="typeList" classPrefix="type" :value.sync="type" />
      <Tabs
        :dataSource="intervalList"
        classPrefix="interval"
        :value.sync="interval"
      />
      {{ type }}
      <br />
      {{ interval }}
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  typeList = [
    { text: "收入", value: "+" },
    { text: "支出", value: "-" },
  ];
  intervalList = [
    { text: "周", value: "week" },
    { text: "月", value: "mouth" },
    { text: "日", value: "day" },
  ];
}
</script>
<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>
