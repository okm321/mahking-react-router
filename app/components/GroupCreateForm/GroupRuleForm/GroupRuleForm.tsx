import { withForm } from "~/hooks/useTanstackForm";
import { GroupCreateFormDefaultValues } from "../GroupCreateForm";
import { groupCreateFormSchema } from "~/schema/groupCreateFormSchema";
import { Heading } from "~/components/shared/Heading";
import { Stack } from "~/components/shared/Stack";
import { FormControl } from "~/components/shared/form/FormControl/FormControl";
import { InputRadioGroup } from "~/components/shared/form/InputRadioGroup";
import { MAHJONG_TYPE_OPTIONS } from "~/constants/mahjongType";

export const GroupRuleForm = withForm({
  defaultValues: GroupCreateFormDefaultValues,
  validators: {
    onSubmit: groupCreateFormSchema
  },
  render: function Render({ form }) {
    return (
      <section>
        <Heading as='h2'>ルール設定</Heading>
        <Stack spacing={8}>
          <form.Field
            name="mahjongType"
            children={(field) => {
              return (
                <FormControl
                  label="打ち方"
                >
                  {({ labelId, error }) => (
                    <InputRadioGroup
                      items={MAHJONG_TYPE_OPTIONS}
                      valueKey='value'
                      labelKey='label'
                      aria-labelledby={labelId}
                      value={field.state.value}
                      onChangeValue={(value) => {
                        field.handleChange(value)
                      }}
                    />
                  )}
                </FormControl>
              )
            }}
          />
        </Stack>
      </section>
    )
  }
})
