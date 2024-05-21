import wait from "@/helpers/wait";
import { lazy } from "react";

const Module = lazy(() =>
  wait().then(() => import("@/modules/Articles/ArticleList"))
);

export default function Page() {
  return <Module />;
}
