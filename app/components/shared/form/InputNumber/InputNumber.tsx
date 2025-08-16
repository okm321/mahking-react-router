import { useState, useEffect } from "react"
import type { AriaAttributes } from "react"
import styles from "../InpuText/InputText.module.scss"
import clsx from "clsx"

type InputNumberProps = {
  /** id */
  id?: string
  /** 値 */
  value: number | null
  /** 値変更のコールバック */
  onChangeValue: (value: number | null) => void
  /** サイズ */
  size?: 'small' | 'medium'
  /** 非活性か */
  disabled?: boolean
  /** プレースホルダー */
  placeholder?: string
  /** エラーか */
  error?: boolean
} & AriaAttributes

export function InputNumber({
  id,
  value,
  onChangeValue,
  size = 'medium',
  disabled,
  placeholder,
  error,
  "aria-describedby": ariaDescribedBy
}: InputNumberProps) {
  const [localValue, setLocalValue] = useState<string>('')

  useEffect(() => {
    setLocalValue(value === null ? '' : String(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  const handleBlur = () => {
    const convertedValue = convertZenkakuToHankaku(localValue)
    if (convertedValue === '') {
      onChangeValue(null)
    } else {
      const numericValue = Number(convertedValue)
      if (!isNaN(numericValue)) {
        setLocalValue(String(numericValue))
        onChangeValue(numericValue)
      }
    }
  }

  return (
    <input
      id={id}
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
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

const convertZenkakuToHankaku = (str: string): string => {
  return str.replace(/[０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
  })
}

