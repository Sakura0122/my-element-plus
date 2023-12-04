<script setup lang="ts">
import SkDropdown from '@/components/Dropdown/index.vue'
import type { MenuOption } from '@/components/Dropdown/types'
import { h } from 'vue'
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3' },
  { key: 4, label: 'item4' }
]
</script>

<template>
  <sk-dropdown :menu-options="options">测试</sk-dropdown>
</template>

<style scoped></style>
