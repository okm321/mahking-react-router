import { Heading } from "~/components/shared/Heading";
import { Stack } from "~/components/shared/Stack";
import { withForm } from "~/hooks/useTanstackForm";
import { GroupCreateFormDefaultValues } from "../formValues";
import { groupCreateFormSchema } from "~/schema/groupCreateFormSchema";
import { revalidateLogic } from "@tanstack/react-form";
import { FormControl } from "~/components/shared/form/FormControl/FormControl";
import { FieldGroupBustFields } from "~/components/FieldGroupBustFields/FieldGroupBustFields";

export const GroupRuleDetailForm = withForm({
  defaultValues: GroupCreateFormDefaultValues,
  validators: {
    onDynamic: groupCreateFormSchema,
  },
  validationLogic: revalidateLogic({
    mode: 'submit',
    modeAfterSubmission: 'change',
  }),
  render: function Render({ form }) {
    return (
      <section>
        <Heading as='h2'>詳細設定</Heading>
        <Stack spacing={8}>
          <form.Field
            name="bustSetting"
            children={(field) => {
              return (
                <FormControl
                  label="飛び設定"
                  required
                >
                  {({ labelId, error }) => (
                    <FieldGroupBustFields form={form} fields="bustSetting" />
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
