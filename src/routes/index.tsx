import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AddPage from "../components/AddPage";
import Pages from "../components/Pages";
import PageContent from "../components/PageContent";

export default function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="pages" element={<Pages />}>
          <Route index element={null} />
          <Route path=":pageId" element={<PageContent />} />
        </Route>
        <Route path="add" element={<AddPage />} />
      </Routes>
    </Suspense>
  )
}