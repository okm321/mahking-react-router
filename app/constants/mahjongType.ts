export const MahjongType = {
  FOUR_PLAYER: 0,
  THREE_PLAYER: 1,
} as const
export type MahjongType = (typeof MahjongType)[keyof typeof MahjongType]

export const MAHJONG_TYPE_LABELS: Record<MahjongType, string> = {
  [MahjongType.FOUR_PLAYER]: "四人打ち",
  [MahjongType.THREE_PLAYER]: "三人打ち",
}

export const MAHJONG_TYPE_OPTIONS = Object.entries(MahjongType).map(
  ([_, value]) => ({
    value,
    label: MAHJONG_TYPE_LABELS[value],
  })
)
