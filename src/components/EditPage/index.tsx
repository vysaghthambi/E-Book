import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageForm from "../PageForm";
import { PAGES_ITEM, PageType } from "../../types";
import { usePages } from "../Pages";

export default function EditPage() {
  const { pageId } = useParams();

  if (!pageId) throw new Error("Page Id not found");

  const navigate = useNavigate();

  const { pages, pagesMap, handlePageUpdate } = usePages();

  const selectedPage = useMemo(() => pagesMap.get(pageId), [pageId, pagesMap]);

  const handleBack = useCallback(() => {
    navigate(`/pages/${pageId}`);
  }, [navigate, pageId]);

  const onSubmit = useCallback((data: PageType) => {
    return new Promise((resolve, reject) => {
      try {
        const updatedData = pages.map(page => page.id === pageId ? { ...page, ...data } : page);

        localStorage.setItem(PAGES_ITEM, JSON.stringify(updatedData));

        handlePageUpdate();

        resolve("Page Edited Successfully");
      } catch (error) {
        reject(error);
      }
    })
  }, [handlePageUpdate, pageId, pages]);

  return (
    <>
      {selectedPage &&
        <PageForm defaultValues={selectedPage} onSubmit={onSubmit} handleBack={handleBack} />
      }

      {!selectedPage && <>page not found</>}
    </>
  );
}