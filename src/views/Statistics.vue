<template>
  <div>
    <Layout>
      <Tabs
        :dataSource="recordTypeList"
        classPrefix="type"
        :value.sync="type"
      />
      <Tabs
        :dataSource="intervalList"
        classPrefix="interval"
        :value.sync="interval"
      />
      <ol>
        <li v-for="group in result" :key="group.title">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{ tagString(item.tag) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span> ￥{{ item.number }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    const hashTable: {
      [key: string]: { title: string; items: RecordItem[] };
    } = {};

    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  created() {
    this.$store.commit("fetchRecord");
  }
  tagString(tags: Tag[]) {
    const name = [];
    for (let i = 0; i < tags.length; i++) {
      name.push(tags[i].name);
    }
    return tags.length === 0 ? "无" : name.join(",");
  }
}
</script>
<style scoped lang="scss">
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 8px 16px;
  line-height: 24px;
}
.record {
  background: white;
  @extend %item;
}
.title {
  @extend %item;
}
.notes {
  color: #999;
  margin-right: auto;
  margin-left: 16px;
}
</style>
