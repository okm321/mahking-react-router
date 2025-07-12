import { useId, type ReactNode } from "react"
import { Stack } from "../../Stack"
import { Label } from "../Label"
import styles from "./FormControl.module.scss"

type FormControlProps = {
  /** ラベル */
  label: string
  /** 必須か */
  required?: boolean
  /** ヘルパーテキスト */
  helperText?: string
  /** エラーメッセージ */
  errorMessage?: string
  children: (props: {
    /** ラベル用のID */
    labelId: string
    /** エラーか */
    error?: boolean
    /** aria-describedby */
    ariaDescribedBy?: string
  }) => ReactNode
}

export function FormControl({
  label,
  helperText,
  required,
  errorMessage,
  children,
}: FormControlProps) {
  const labelId = useId()
  const helpId = useId()
  const errorId = useId()

  const ariaDescribedBy = [
    errorMessage && errorId,
    helperText && helpId
  ].filter(Boolean).join(' ')


  return (
    <Stack spacing={1}>
      <Label required={required} htmlFor={labelId}>{label}</Label>
      {!!helperText && (
        <span id={helpId} className={styles.helper_text}>
          {helperText}
        </span>
      )}
      {children({ labelId, error: !!errorMessage, ariaDescribedBy })}
      {!!errorMessage && (
        <span id={errorId} className={styles.error_text} role="alert">{errorMessage}</span>
      )}
    </Stack>
  )
}
