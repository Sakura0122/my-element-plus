export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /** 类型 */
  type?: ButtonType
  /** 尺寸 */
  size?: ButtonSize
  /** 是否为朴素按钮 */
  plain?: boolean
  /** 是否为圆角按钮 */
  round?: boolean
  /** 是否为圆形按钮 */
  circle?: boolean
  /** 按钮是否为禁用状态 */
  disabled?: boolean
  /** 原生 type 属性 */
  nativeType?: NativeType
  /** 原生 autofocus 属性 */
  autofocus?: boolean
  /** 图标组件 */
  icon?: string
  /** 是否为加载中状态 */
  loading?: boolean
}

export interface ButtonInstance {
  ref: HTMLButtonElement
}
