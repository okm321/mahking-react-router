import z from "zod";

export const bustSettingSchema = z.object({
  useBust: z.boolean(),
  bustBonus: z.number().min(0).int()
})

export const groupRuleDetailFormSchema = z.object({
  bustSetting: bustSettingSchema,
})
