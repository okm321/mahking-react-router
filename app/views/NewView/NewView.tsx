import { useState } from "react";
import { FormControl } from "~/components/shared/form/FormControl/FormControl";
import { InputText } from "~/components/shared/form/InpuText";
import { InputAddToList } from "~/components/shared/form/InputTextWithButton";
import { Stack } from "~/components/shared/Stack";
import styles from "./NewView.module.scss";
import { Heading } from "~/components/shared/Heading";
import { Button } from "~/components/shared/Button";
import { Users } from "lucide-react";
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
      onSubmit: basicInfoFormSchema
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
    }
  })

  return (
    <section>
      <Heading as='h2'>対局グループ</Heading>
      <form onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}>
        <Stack spacing={8}>
          <FormControl
            label="グループ名"
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
              const { value, meta: { errors } } = field.state
              return (
                <FormControl
                  label="メンツの名前"
                  required
                  errorMessage={memberNameErrMessage || errors[0]?.message}
                  helperText="同じ名前は登録できません。最大で10人まで登録できます。"
                >
                  {({ labelId, error, ariaDescribedBy }) => (
                    <InputAddToList
                      values={value}
                      size='medium'
                      placeholder="雀太郎"
                      error={!!errors?.length || error}
                      id={labelId}
                      aria-describedby={ariaDescribedBy}
                      buttonText="追加"
                      maxCount={10}
                      onChangeValues={(values) => {
                        field.handleChange(values)
                      }}
                      onDelete={(index) => {
                        field.handleChange(field.state.value.filter((_, i) => i !== index))
                      }}
                    />
                  )}
                </FormControl>
              )
            }}
          />
        </Stack>
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              size='l'
              type="submit"
              startIcon={<Users />}
              loading={isSubmitting}
              loadingText="グループ作成中"
              className={styles.submit_button}
            >グループを作成する</Button>
          )}
        />
      </form>
    </section>
  )
}
