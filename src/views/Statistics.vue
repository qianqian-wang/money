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
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }}</h3>
          <ol>
            <li v-for="item in group.item" :key="item.id" class="record">
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
import dayjs from "dayjs";
import clone from "@/lib/clone";

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
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    const result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        item: [newList[0]],
      },
    ];
    for (let i = 0; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.item.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          item: [current],
        });
      }
    }
    console.log(result);
    return result;
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
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
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
