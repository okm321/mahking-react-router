import { HomePage } from "~/pages/HomePage";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mahking | 麻雀の対局記録アプリ" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Component() {
  return <HomePage />;
}
