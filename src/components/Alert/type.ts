export interface AlertProps {
  content?: string
  type?: 'success' | 'warning' | 'danger' | 'info'
  effect?: 'light' | 'dark'
  closable?: boolean
}

export type AlertEmits = {
  close: []
}

export interface Instance {
  close: () => void
}
