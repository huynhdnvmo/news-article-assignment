import PATHS from "@/constants/paths";
import MainLayout from "@/layouts/MainLayout";
import routes from "@/routes";
import type { AppRouterProps, RouteConfig } from "@/types";
import { Suspense, createElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function AppRouter(props: AppRouterProps) {
  return (
    <BrowserRouter {...props}>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route: RouteConfig) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                element={
                  <Suspense fallback={<></>}>
                    {route.component ? createElement(route.component) : <></>}
                  </Suspense>
                }
              />
            );
          })}
        </Route>
        <Route path="*" element={<Navigate to={PATHS.main} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
