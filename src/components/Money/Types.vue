<template>
  <ul class="types">
    <li :class="type === '-' && 'selected'" @click="selected('-')">支出</li>
    <li :class="type === '+' && 'selected'" @click="selected('+')">收入</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      type: "-", //-号表示支出 +号表示收入
    };
  },
  methods: {
    selected(type) {
      if (type !== "-" && type !== "+") {
        throw new Error("type is unknown");
      }
      this.type = type;
    },
  },
};
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  // text-align: center;
  li {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
