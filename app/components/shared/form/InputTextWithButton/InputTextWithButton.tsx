import { useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './InputTextWithButton.module.scss'
import type { AriaAttributes } from 'react'

type InputTextWithButtonProps = {
  /** id */
  id?: string
  /** value */
  values: string[]
  /** 値変更時 */
  onChangeValues: (value: string[]) => void
  /** 値が正しいか */
  onCheckValidValue?: (value: string) => boolean
  /** サイズ */
  size?: 'small' | 'medium'
  /** 非活性か */
  disabled?: boolean
  /** プレースホルダー */
  placeholder?: string
  /** エラーか */
  error?: boolean
  /** ボタンのテキスト */
  buttonText?: string
  /** 最大数 */
  maxCount?: number
} & AriaAttributes

export function InputTextWithButton({
  id,
  values,
  onChangeValues,
  onCheckValidValue,
  size = 'medium',
  disabled,
  placeholder,
  error,
  buttonText = '送信',
  maxCount,
  "aria-describedby": ariaDescribedBy
}: InputTextWithButtonProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = () => {
    if (!disabled && inputValue.trim()) {
      if (onCheckValidValue != null && !onCheckValidValue(inputValue.trim())) {
        return
      }
      onChangeValues([...values, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const disabledSubmitButton = useMemo(() => {
    return disabled || (maxCount != null && values.length >= maxCount) || !inputValue.trim()
  }, [values, disabled, maxCount, inputValue])

  return (
    <div
      className={clsx(
        styles.input_text_with_button,
        size === 'medium' ? styles.input_text_with_button__medium : styles.input_text_with_button__small,
        error && styles['input_text_with_button-error'],
        disabled && styles['input_text_with_button-disabled']
      )}
    >
      <input
        id={id}
        type="text"
        className={styles.input_text}
        placeholder={placeholder}
        disabled={disabled}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-invalid={error}
        aria-describedby={ariaDescribedBy}
      />
      <button
        type="button"
        className={clsx(
          styles.button,
          disabledSubmitButton && styles[`button-disabled`]
        )}
        disabled={disabledSubmitButton}
        onClick={handleSubmit}
      >
        {buttonText}
      </button>
    </div>
  )
}
