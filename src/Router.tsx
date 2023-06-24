import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import App from "./App";

const AppRouter = lazy(() => import("./routes/index"))

export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route element={<App />}>
          <Route path="*" element={<AppRouter />} />
        </Route>
      </Routes>
    </Suspense>
  )
}