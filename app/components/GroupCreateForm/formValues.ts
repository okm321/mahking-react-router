import { MahjongType } from "~/constants/mahjongType"

export type RankingPointFields = {
  first: number | null
  second: number | null
  third: number | null
  fourth: number | null
}

export const RankingPointFieldsDefaultValues: RankingPointFields = {
  first: 20,
  second: 10,
  third: -10,
  fourth: -20
}

export type GroupCreateFormValues = {
  /** グループ名 */
  groupName: string
  /** メンバー名 */
  memberNames: string[]
  /** 麻雀の種類 */
  mahjongType: MahjongType
  /** 持ち点 */
  initialPoints: number | null
  /** 返し点 */
  returnPoints: number | null
  /** ウマ */
  rankingPoints: RankingPointFields
}

export const GroupCreateFormDefaultValues: GroupCreateFormValues = {
  groupName: '',
  memberNames: [],
  mahjongType: MahjongType.THREE_PLAYER,
  initialPoints: 35,
  returnPoints: 50,
  rankingPoints: RankingPointFieldsDefaultValues
}
