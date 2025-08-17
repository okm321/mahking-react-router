import z from "zod";
import { MahjongType } from "~/constants/mahjongType";

const pointsSchema = z.number({
  message: "半角数字を入力してください"
}).int().min(10, {
  message: "10以上の値を入力してください"
}).max(50, {
  message: "50以下の値を入力してください"
})

export const groupCreateFormSchema = z.object({
  groupName: z.string().max(50, {
    message: "50文字以内で入力してください"
  }),
  memberNames: z.array(z.string().max(10)).min(3, {
    message: "メンツは3人以上登録してください"
  }).max(10, {
    message: "メンツは最大10人まで登録できます"
  }).check((ctx) => {
    const uniqueNames = ctx.value.filter((name, i, self) => {
      return self.indexOf(name) === i && i !== self.lastIndexOf(name)
    })
    if (uniqueNames.length > 0) {
      ctx.issues.push({
        code: "custom",
        message: `同じ名前は登録できません: ${Array.from(uniqueNames).join(", ")}`,
        input: ctx.value,
      })
    }
  }),
  mahjongType: z.enum(MahjongType),
  initialPoints: pointsSchema,
  returnPoints: pointsSchema,
}).refine((data) => {
  if (data.memberNames.length < 4 && data.mahjongType === MahjongType.FOUR_PLAYER) {
    return false;
  }
  return true;
}, {
  message: "4人未満のメンツでは四人打ちを選択できません",
  path: ["mahjongType"],
}).refine(({ initialPoints, returnPoints }) => {
  if (initialPoints == null || returnPoints == null) {
    return true;
  }
  if (initialPoints > returnPoints) {
    return false;
  }

  return true
}, {
  message: "返し点は持ち点以上にしてください",
  path: ["returnPoints"],
})

export type GroupCreateFormType = z.infer<typeof groupCreateFormSchema>;

