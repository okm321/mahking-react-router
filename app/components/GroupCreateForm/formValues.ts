import { MahjongType } from "~/constants/mahjongType"

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
}

export const GroupCreateFormDefaultValues: GroupCreateFormValues = {
  groupName: '',
  memberNames: [],
  mahjongType: MahjongType.THREE_PLAYER,
  initialPoints: 35,
  returnPoints: 50
}

