<template>
  <Layout classPrefix="layout">
    <number-pad />
    <types />
    <notes />
    <tags :dataSource="tags" />
  </Layout>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  components: { NumberPad, Types, Notes, Tags },
  data() {
    return { tags: ["衣", "食", "住", "行", "caipiao"] };
  },
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped></style>
