import wait from "@/helpers/wait";
import { lazy } from "react";

const DateTimeProvider = lazy(() =>
  wait().then(() => import("@/providers/DateTimeProvider"))
);

const ExceptionHandlingProvider = lazy(() =>
  wait().then(() => import("@/providers/ExceptionHandlingProvider"))
);

const MUIThemeV5Provider = lazy(() =>
  wait().then(() => import("@/providers/MUIThemeV5Provider"))
);

const AppRouter = lazy(() => wait().then(() => import("./AppRouter")));

export default function App() {
  return (
    <ExceptionHandlingProvider>
      <DateTimeProvider>
        <MUIThemeV5Provider>
          <AppRouter />
        </MUIThemeV5Provider>
      </DateTimeProvider>
    </ExceptionHandlingProvider>
  );
}
