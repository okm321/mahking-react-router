import { GroupIndexView } from "~/views/group/GroupIndexView"
import type { Route } from "./+types/group.rule";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "グループ名入れたい | Mahking 麻雀の対局記録アプリ" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Component() {
  return <GroupIndexView />
}
