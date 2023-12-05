<script setup lang="ts">
import SkButton from '@/components/Button/index.vue'
import { createMessage } from '@/components/Message/method'

const create = () => {
  createMessage({ message: '测试', type: 'success' })
}
</script>

<template>
  <sk-button type="primary" @click="create">按钮</sk-button>
</template>

<style scoped></style>
