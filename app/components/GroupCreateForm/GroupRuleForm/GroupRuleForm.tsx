import { withForm } from "~/hooks/useTanstackForm";
import { groupCreateFormSchema } from "~/schema/groupCreateFormSchema";
import { Heading } from "~/components/shared/Heading";
import { Stack } from "~/components/shared/Stack";
import { FormControl } from "~/components/shared/form/FormControl/FormControl";
import { InputRadioGroup } from "~/components/shared/form/InputRadioGroup";
import { createMahjongTypeOptions, } from "~/constants/mahjongType";
import { GroupCreateFormDefaultValues } from "../formValues";
import { useMemo } from "react";
import { useStore } from "@tanstack/react-form";
import { InputNumber } from "~/components/shared/form/InputNumber";
import styles from "./GroupRuleForm.module.scss";

export const GroupRuleForm = withForm({
  defaultValues: GroupCreateFormDefaultValues,
  validators: {
    onSubmit: groupCreateFormSchema,
  },
  render: function Render({ form }) {
    const playerNames = useStore(form.store, (state) => state.values.memberNames)
    const overFourPlayers = useMemo(() => {
      return playerNames.length >= 4
    }, [playerNames.length]);

    return (
      <section>
        <Heading as='h2'>ルール設定</Heading>
        <Stack spacing={8}>
          <form.Field
            name="mahjongType"
            children={(field) => {
              const { meta: { errors } } = field.state;
              return (
                <FormControl
                  label="打ち方"
                  required
                  helperText="4人以上メンツを登録すると、四人打ちを選択できます。"
                  errorMessage={errors[0]?.message}
                >
                  {({ labelId, error, ariaDescribedBy }) => (
                    <InputRadioGroup
                      aria-label="打ち方"
                      items={createMahjongTypeOptions(overFourPlayers)}
                      valueKey='value'
                      labelKey='label'
                      aria-labelledby={labelId}
                      aria-describedby={ariaDescribedBy}
                      value={field.state.value}
                      error={error}
                      onChangeValue={(value) => {
                        field.handleChange(value)
                      }}
                    />
                  )}
                </FormControl>
              )
            }}
          />
          <div className={styles.point_setting}>
            <form.Field
              name="initialPoints"
              children={(field) => {
                const { meta: { errors } } = field.state;
                return (
                  <FormControl
                    label="持ち点"
                    required
                    errorMessage={errors[0]?.message}
                    className={styles.point_form}
                  >
                    {({ labelId, error }) => (
                      <InputNumber
                        id={labelId}
                        name={field.name}
                        value={field.state.value}
                        error={error}
                        suffix={<PointSuffix />}
                        onChangeValue={(value) => {
                          field.handleChange(value)
                        }}
                      />
                    )}
                  </FormControl>
                )
              }}
            />
            <form.Field
              name="returnPoints"
              children={(field) => {
                const { meta: { errors } } = field.state;
                return (
                  <FormControl
                    label="返し点"
                    required
                    errorMessage={errors[0]?.message}
                    className={styles.point_form}
                  >
                    {({ labelId, error }) => (
                      <InputNumber
                        id={labelId}
                        name={field.name}
                        value={field.state.value}
                        error={error}
                        suffix={<PointSuffix />}
                        onChangeValue={(value) => {
                          field.handleChange(value)
                        }}
                      />
                    )}
                  </FormControl>
                )
              }}
            />
          </div>
        </Stack>
      </section>
    )
  }
})

const PointSuffix = () => {
  return <span className={styles.point_suffix}>000点</span>
}

