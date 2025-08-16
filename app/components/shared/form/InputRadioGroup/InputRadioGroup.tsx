import { useId, type AriaAttributes } from "react"
import styles from "./InputRadioGroup.module.scss"

type InputRadioGroupProps<
  Item extends Record<string, any>,
  ValueKey extends keyof Item,
> = {
  /** value */
  value: Item[ValueKey];
  /** 項目 */
  items: Item[];
  /** valueのキー */
  valueKey: ValueKey;
  /** labelのキー */
  labelKey: keyof Item;
  /** エラーか */
  error?: boolean;
  /** 値変更時のコールバック */
  onChangeValue: (value: Item[ValueKey]) => void;
} & AriaAttributes

export function InputRadioGroup<
  Item extends Record<string, any>,
  ValueKey extends keyof Item
>({
  value,
  items,
  valueKey,
  labelKey,
  error,
  onChangeValue,
  "aria-labelledby": ariaLabelledBy,
}: InputRadioGroupProps<Item, ValueKey>) {
  const radioGroupName = useId()
  return (
    <div
      role="radiogroup"
      aria-labelledby={ariaLabelledBy}
      aria-invalid={error}
      className={styles.input_ragio_group}
    >
      {items.map((item) => {
        const itemId = `radio-item-${item[valueKey]}`
        return (
          <span key={itemId} className={styles.input_radio_item}>
            <span className={styles.input_radio_wrapper}>
              <input
                id={itemId}
                type='radio'
                name={radioGroupName}
                aria-invalid={error}
                checked={value === item[valueKey]}
                value={item[valueKey]}
                onChange={() => onChangeValue(item[valueKey])}
                className={styles.input_radio}
              />
              <span className={styles.radio_button} aria-hidden="true" />
            </span>
            <label
              htmlFor={itemId}
              className={styles.input_label}
            >{item[labelKey]}</label>
          </span>
        )
      })}
    </div>
  )
}
