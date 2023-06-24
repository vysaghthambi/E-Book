import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageForm from "../PageForm";
import { PageType } from "../../types";

export default function EditPage() {
  const { pageId } = useParams();

  if (!pageId) throw new Error("Page Id not found");

  const [pages, setPages] = useState<PageType[] | null>(null);
  const [defaultValues, setDefaultValues] = useState<PageType | null>(null);
  const [pageNotFound, setPageNotFound] = useState<boolean>(false);

  useEffect(() => {
    const storedPages = localStorage.getItem("pages");

    if (storedPages) setPages(JSON.parse(storedPages));
  }, [pageId])

  useEffect(() => {
    if (!pages) return;

    const selectedPage = pages.find(page => page.id === pageId);

    setPageNotFound(!selectedPage);
    setDefaultValues(selectedPage ?? null);
  }, [pageId, pages])

  const onSubmit = useCallback((data: PageType) => {
    return new Promise((resolve, reject) => {
      try {
        if (!pages) return;

        const filteredData = pages.filter(page => page.id !== pageId);

        const updatedData = [...filteredData, data];

        localStorage.setItem("pages", JSON.stringify(updatedData));

        resolve("Page Edited Successfully");
      } catch (error) {
        reject(error);
      }
    })
  }, [pageId, pages])

  return (
    <>
      {defaultValues && <PageForm defaultValues={defaultValues} onSubmit={onSubmit} />}

      {!defaultValues && !pageNotFound && <>loading...</>}

      {pageNotFound && <>page not found</>}
    </>
  )
}