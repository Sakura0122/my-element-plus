<script setup lang="ts">
import SkButton from '@/components/Button/index.vue'
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types'

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log(buttonRef.value?.ref)
})
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
</template>

<style scoped></style>
