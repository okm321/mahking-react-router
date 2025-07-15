import z from "zod";

export const basicInfoFormSchema = z.object({
  groupName: z.string().max(50, {
    message: "50文字以内で入力してください"
  }),
  memberNames: z.array(z.string().max(10)).min(3, {
    message: "メンツは3人以上登録してください"
  }).max(10, {
    message: "メンツは最大10人まで登録できます"
  }).refine((names) => {
    const uniqueNames = new Set(names);
    return uniqueNames.size === names.length;
  }, {
    message: "この名前はすでに登録されています"
  })
})

export type BasicInfoFormType = z.infer<typeof basicInfoFormSchema>;
