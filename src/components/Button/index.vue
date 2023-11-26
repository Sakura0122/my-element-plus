<script setup lang="ts">
import type { ButtonProps } from './types'
import { ref } from 'vue'
import SkIcon from '@/components/Icon/index.vue'

defineOptions({ name: 'SkButton' })

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<template>
  <button
    ref="_ref"
    class="sk-button"
    :class="{
      [`sk-button--${type}`]: type,
      [`sk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <sk-icon icon="spinner" spin v-if="loading" />
    <sk-icon :icon="icon" v-if="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
