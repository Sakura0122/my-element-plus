<script setup lang="ts">
import SkButton from '@/components/Button/index.vue'
</script>

<template>
  <sk-button>按钮</sk-button>
  <sk-button plain>按钮</sk-button>
  <sk-button round>按钮</sk-button>
  <sk-button circle>按钮</sk-button>
  <sk-button type="primary">按钮</sk-button>
  <sk-button type="success">按钮</sk-button>
  <sk-button type="info">按钮</sk-button>
  <sk-button type="warning">按钮</sk-button>
  <sk-button type="danger">按钮</sk-button>
  <sk-button type="primary" plain>按钮</sk-button>
  <sk-button type="success" plain>按钮</sk-button>
  <sk-button type="info" plain>按钮</sk-button>
  <sk-button type="warning" plain>按钮</sk-button>
  <sk-button type="danger" plain>按钮</sk-button>
  <sk-button type="primary" size="small">按钮</sk-button>
  <sk-button type="primary" size="large">按钮</sk-button>
  <br />
  <sk-button loading>按钮</sk-button>
  <sk-button icon="arrow-up">按钮</sk-button>
</template>

<style scoped></style>
