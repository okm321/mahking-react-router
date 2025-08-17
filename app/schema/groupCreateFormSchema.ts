import z from "zod";
import { FractionalCalculation, RemainderRecipient } from "~/constants/fractionalCalculation";
import { MahjongType } from "~/constants/mahjongType";

const pointsSchema = z.number({
  message: "半角数字を入力してください"
}).int().min(10, {
  message: "10以上の値を入力してください"
}).max(50, {
  message: "50以下の値を入力してください"
})

const rankingPointSchema = z.number({
  message: "半角数字を入力してください"
}).int().min(-500, {
  message: "500以下の値を入力してください"
}).max(500, {
  message: "500以上の値を入力してください"
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
  rankingPoints: z.object({
    first: rankingPointSchema,
    second: rankingPointSchema,
    third: rankingPointSchema,
    fourth: z.number().int().nullable()
  }),
  fractionalCalculation: z.object({
    type: z.enum(FractionalCalculation),
    remainderRecipient: z.enum(RemainderRecipient)
  })
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
}).refine(({ mahjongType, rankingPoints }) => {
  if (mahjongType === MahjongType.FOUR_PLAYER && rankingPoints.fourth == null) {
    return false;
  }
  return true
}, {
  message: "半角数字を入力してください",
  path: ["rankingPoints.fourth"]
})
  .refine(({ mahjongType, rankingPoints }) => {
    if (mahjongType === MahjongType.THREE_PLAYER) {
      const sum = rankingPoints.first + rankingPoints.second + rankingPoints.third;
      if (sum !== 0) {
        return false;
      }
      return true;
    }
    const sum = rankingPoints.first + rankingPoints.second + rankingPoints.third + (rankingPoints.fourth ?? 0);
    if (sum !== 0) {
      return false;
    }
    return true
  }, {
    message: "ウマの合計は0になるようにしてください",
    path: ["rankingPoints"],
  })

export type GroupCreateFormType = z.infer<typeof groupCreateFormSchema>;

