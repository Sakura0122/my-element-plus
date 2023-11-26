<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from '@/components/Icon/type'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({ name: 'SkIcon', inheritAttrs: false })

const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i
    class="sk-icon"
    :class="{
      [`sk-icon--${type}`]: type
    }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped></style>
