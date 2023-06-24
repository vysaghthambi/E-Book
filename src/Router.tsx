import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import App from "./App";

export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route element={<App />}>
          <Route path="*" element={<>App</>} />
        </Route>
      </Routes>
    </Suspense>
  )
}