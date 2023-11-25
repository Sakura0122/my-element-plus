<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import type { CollapseEmits, CollapseProps, NameType } from '@/components/Collapse/types'
import { collapseContextKey } from '@/components/Collapse/types'

defineOptions({ name: 'SkCollapse' })
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item')
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 存在 删除数组对应的一项
      activeNames.value.splice(index, 1)
    } else {
      // 不存在 插入对应的name
      activeNames.value.push(item)
    }
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

provide(collapseContextKey, { activeNames, handleItemClick })
</script>

<template>
  <div class="sk-collapse">
    <slot />
  </div>
</template>

<style scoped></style>
