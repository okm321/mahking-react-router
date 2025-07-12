import { useId } from "react";
import { FormControl } from "~/components/shared/form/FormControl/FormControl";
import { InputText } from "~/components/shared/form/InpuText";
import { Label } from "~/components/shared/form/Label";
import { Stack } from "~/components/shared/Stack";

export function NewView() {
  return (
    <Stack spacing={8}>
      <FormControl
        label="対局グループ名"
        helperText="未入力だと今日の日付が入ります"
      >
        {({ labelId, error, ariaDescribedBy }) => (
          <InputText id={labelId} aria-describedby={ariaDescribedBy} error={error} />
        )}
      </FormControl>
      <FormControl
        label="雀士の名前"
      >
        {({ labelId, error, ariaDescribedBy }) => (
          <InputText id={labelId} aria-describedby={ariaDescribedBy} error={error} />
        )}
      </FormControl>
    </Stack>
  )
}
