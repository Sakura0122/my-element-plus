<script setup lang="ts">
import type { TooltipEmits, TooltipInstance, TooltipProps } from '@/components/Tooltip/type'
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({ name: 'SkTooltip' })

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let dropdownEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})
// 添加一个默认时间，添加一个 50 毫秒的关闭 delay，解决当 下拉菜单和 触发直接有间距的时候引出的问题
const closeDelay = computed(() => (props.trigger === 'hover' && props.closeDelay === 0 ? 50 : props.closeDelay))
const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, closeDelay.value)
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const togglePopper = () => {
  isOpen.value ? closeFinal() : openFinal()
}
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
    // 中间有个间隙，会造成 dropdown 在 hover 的时候关闭
    dropdownEvents['mouseenter'] = openFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
watch(
  () => props.manual,
  (value) => {
    if (value) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)
watch(
  () => props.trigger,
  (value, oldValue) => {
    if (value !== oldValue) {
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)
watch(
  isOpen,
  (value) => {
    if (value) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<template>
  <div class="sk-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="sk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="sk-tooltip__popper" ref="popperNode" v-on="dropdownEvents">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
