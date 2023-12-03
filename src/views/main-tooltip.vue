<script setup lang="ts">
import SkTooltip from '@/components/Tooltip/index.vue'
import { ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/type'

const tooltipRef = ref<TooltipInstance | null>(null)
</script>

<template>
  <sk-tooltip ref="tooltipRef" :open-delay="1000" :close-delay="1000">
    好好好
    <template #content> 123 </template>
  </sk-tooltip>
</template>

<style scoped></style>
