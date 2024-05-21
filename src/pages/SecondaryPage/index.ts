import PATHS from "@/constants/paths";
import wait from "@/helpers/wait";
import type { RouteConfig } from "@/types";
import { lazy } from "react";

const Page = lazy(() => wait().then(() => import("./Page")));

const SecondaryPage: RouteConfig = {
  name: "SecondaryRoute",
  path: PATHS.second,
  component: Page,
};

export default SecondaryPage;
