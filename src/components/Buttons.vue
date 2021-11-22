<template>
  <button class="button" @click="$emit('click', $event)"><slot /></button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
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
