import type { CreateMessageProps, MessageContext, MessageProps } from '@/components/Message/type'
import { render, h, shallowReactive } from 'vue'
import MessageConstructor from './index.vue'
import useZIndex from '@/hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const { nextZIndex } = useZIndex()
  const container = document.createElement('div')
  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }
  // 手动调用删除，其实就是手动的调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps: MessageProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy
  }
  instances.push(instance)
  return instances
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}
