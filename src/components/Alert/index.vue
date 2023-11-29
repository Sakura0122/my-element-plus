<script setup lang="ts">
import type { AlertEmits, AlertProps } from '@/components/Alert/type'
import SkIcon from '@/components/Icon/index.vue'
import { ref } from 'vue'

defineOptions({ name: 'SkAlert' })

withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true
})
const emits = defineEmits<AlertEmits>()
const visible = ref(true)

const hideAlert = () => {
  visible.value = false
  emits('close')
}
defineExpose({
  hide: () => hideAlert()
})
</script>

<template>
  <Transition name="sk-alert-fade">
    <div
      v-if="visible"
      class="sk-alert"
      :class="{
        [`sk-alert__${type}`]: type,
        [`sk-alert__${effect}`]: effect
      }"
    >
      <div class="sk-alert__content">
        {{ content }}
        <span>
          <slot />
        </span>
      </div>
      <div class="sk-alert__close" v-if="closable">
        <sk-icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
