import { useState } from "react";
import { Chip } from "~/components/shared/Chip";
import { FormControl } from "~/components/shared/form/FormControl/FormControl";
import { InputText } from "~/components/shared/form/InpuText";
import { InputTextWithButton } from "~/components/shared/form/InputTextWithButton";
import { Stack } from "~/components/shared/Stack";
import styles from "./NewView.module.scss";
import { Heading } from "~/components/shared/Heading";
import { Button } from "~/components/shared/Button";
import { CheckSquareIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form"
import { basicInfoFormSchema, type BasicInfoFormType } from "~/schema/basicInfoFormSchema";

export function NewView() {
  const [memberNameErrMessage, setMemberNameErrMessage] = useState<string>('')
  const form = useForm({
    defaultValues: {
      groupName: '',
      memberNames: []
    } satisfies BasicInfoFormType as BasicInfoFormType,
    validators: {
      onChange: basicInfoFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("value", value)
    }
  })

  return (
    <section>
      <Heading as='h2'>基本情報</Heading>
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>
        <Stack spacing={8}>
          <FormControl
            label="対局グループ名"
            helperText="未入力だと今日の日付+メンツの名前が設定されます。"
          >
            {({ labelId, error, ariaDescribedBy }) => (
              <form.Field
                name='groupName'
                children={(field) => {
                  return (
                    <InputText
                      id={labelId}
                      value={field.state.value}
                      aria-describedby={ariaDescribedBy}
                      placeholder="麻雀大会"
                      error={error}
                      onChangeValue={(value) => {
                        field.handleChange(value)
                      }}
                    />
                  )
                }}
              />
            )}
          </FormControl>
          <form.Field
            name='memberNames'
            mode='array'
            children={(field) => {
              return (
                <FormControl
                  label="メンツの名前"
                  required
                  errorMessage={field.state.meta.errors[0]?.message}
                  helperText="同じ名前は登録できません。最大で10人まで登録できます。"
                >
                  {({ labelId, error, ariaDescribedBy }) => (
                    <>
                      <InputTextWithButton
                        values={field.state.value}
                        onChangeValues={(values) => {
                          field.handleChange(values)
                        }}
                        // onCheckValidValue={(value) => {
                        //   if (field.state.value.includes(value)) {
                        //     return false
                        //   }
                        //   return true
                        // }}
                        size='medium'
                        placeholder="雀太郎"
                        error={!!field.state.meta.errors?.length || error}
                        id={labelId}
                        aria-describedby={ariaDescribedBy}
                        buttonText="追加"
                        maxCount={10}
                      />
                      {/* TODO: チップコンポーネントをInputTextWithButtonに入れる */}
                      <ul className={styles.member_list}>
                        {field.state.value.map((member, index) => (
                          <Chip as="li" key={member} text={member} onDelete={() => {
                            field.handleChange(field.state.value.filter((_, i) => i !== index))
                          }} />
                        ))}
                      </ul>
                    </>
                  )}
                </FormControl>
              )
            }}
          />
        </Stack>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              size='l'
              type="submit"
              startIcon={<CheckSquareIcon />}
              className={styles.submit_button}
              disabled={!canSubmit}
            >基本情報を確定する</Button>
          )}
        />
      </form>
    </section>
  )
}
