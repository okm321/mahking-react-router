import clsx from "clsx"
import styles from "./InputText.module.scss"
import type { AriaAttributes } from "react"

type InputTextProps = {
  /** id */
  id?: string
  /** name */
  name?: string
  /** 値 */
  value: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /** 値変更時のコールバック */
  onChangeValue: (value: string) => void
  /** サイズ */
  size?: 'small' | 'medium'
  /** 非活性か */
  disabled?: boolean
  /** プレースホルダー */
  placeholder?: string
  /** エラーか */
  error?: boolean
} & AriaAttributes

export function InputText({
  id,
  name,
  value,
  onBlur,
  onChangeValue,
  size = 'medium',
  disabled,
  placeholder,
  error,
  "aria-describedby": ariaDescribedBy
}: InputTextProps) {
  return (
    <input
      id={id}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(e) => onChangeValue(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      aria-invalid={error}
      aria-describedby={ariaDescribedBy}
      className={clsx(
        styles.input_text,
        size === 'medium' && styles.input_text__medium,
        error && styles['input_text-error'],
        disabled && styles['input_text-disabled']
      )}
    />
  )
}
