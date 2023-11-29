<script setup lang="ts">
import SkAlert from '@/components/Alert/index.vue'
</script>

<template>
  <div class="wrapper">
    <sk-alert type="success">success</sk-alert>
    <sk-alert type="warning">primary</sk-alert>
    <sk-alert type="danger">primary</sk-alert>
    <sk-alert type="info">primary</sk-alert>
  </div>
</template>

<style scoped>
.wrapper {
  width: 500px;
}
</style>
