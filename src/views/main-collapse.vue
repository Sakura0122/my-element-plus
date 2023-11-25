<script setup lang="ts">
import SkCollapse from '@/components/Collapse/index.vue'
import SkCollapseItem from '@/components/Collapse/components/collapse-item.vue'
import { ref } from 'vue'

const modelValue = ref(['1'])
</script>

<template>
  <div class="wrapper">
    <sk-collapse v-model="modelValue" accordion>
      <sk-collapse-item title="标题1" name="1">内容1</sk-collapse-item>
      <sk-collapse-item title="标题2" name="2" disabled>内容2</sk-collapse-item>
      <sk-collapse-item name="3">
        <template #title>标题3</template>
        <template #default>内容3</template>
      </sk-collapse-item>
    </sk-collapse>
  </div>
</template>

<style scoped>
.wrapper {
  width: 500px;
}
</style>
