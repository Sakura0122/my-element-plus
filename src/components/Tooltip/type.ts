import type { Options, Placement } from '@popperjs/core'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  popperOptions?: Partial<Options>
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export type TooltipEmits = {
  'visible-change': [value: boolean]
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
