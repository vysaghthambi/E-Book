import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AddPage from "../components/AddPage";

export default function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="pages" element={<>Pages</>} />
        <Route path="add" element={<AddPage />} />
      </Routes>
    </Suspense>
  )
}