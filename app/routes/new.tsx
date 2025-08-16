import { GroupCreateView } from "~/views/GroupCreateView";
import type { Route } from "./+types/new";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "新規作成 | Mahking 麻雀の対局記録アプリ" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Component() {
  return <GroupCreateView />
}
