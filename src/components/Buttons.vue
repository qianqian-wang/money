<template>
  <button class="button"><slot></slot></button>
</template>

<script lang="ts">
import Vue from "vue";

export default class Buttons extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  border-radius: 4px;
  color: white;
  padding: 9px 16px;
  border: none;
}
</style>
