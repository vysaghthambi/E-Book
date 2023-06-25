import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AddPage from "../components/AddPage";
import Pages from "../components/Pages";
import PageContent from "../components/Pages/PageContent";
import EditPage from "../components/EditPage";

export default function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path="pages" element={<Pages />}>
          <Route index element={null} />
          <Route path=":pageId" element={<PageContent />} />
          <Route path=":pageId/edit" element={<EditPage />} />
        </Route>
        <Route path="add" element={<AddPage />} />
        <Route path="*" element={<Navigate to="pages" />} />
      </Routes>
    </Suspense>
  )
}