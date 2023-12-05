<script setup lang="ts">
import RenderVnode from '@/components/Common/RenderVnode'
import type { MessageProps } from '@/components/Message/type'
import SkIcon from '@/components/Icon/index.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { getLastBottomOffset } from '@/components/Message/method'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

const messageRef = ref<HTMLDivElement>()
// 这个 div 的高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

const visible = ref(false)

let timer: any

function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
// watch(visible, (value) => {
//   if (!value) {
//     props.onDestroy()
//   }
// })

document.addEventListener('keydown', (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
})

function destroyComponent() {
  props.onDestroy()
}

function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  bottomOffset,
  visible
})
</script>

<template>
  <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">
    <div
      class="sk-message"
      v-show="visible"
      :class="{
        [`sk-message--${type}`]: type,
        'is-close': showClose
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="sk-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="sk-message__close" v-if="showClose">
        <sk-icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
