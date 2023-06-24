import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import parse from "html-react-parser";

import { PageType } from "../../types";

export default function PageContent() {
  const { pageId } = useParams();

  if (!pageId) throw new Error("Page Id not found");

  const [page, setPage] = useState<PageType | null>(null);
  const [pageNotFound, setPageNotFound] = useState<boolean>(false);

  useEffect(() => {
    const storedPages = localStorage.getItem("pages");

    if (!storedPages) return;

    const selectedPage = (JSON.parse(storedPages) as PageType[]).find(page => page.id === pageId);

    setPageNotFound(!selectedPage);
    setPage(selectedPage ?? null);
  }, [pageId]);

  return (
    <div>
      {page && <>{parse(page.content)}</>}

      {!page && !pageNotFound && <>loading...</>}

      {pageNotFound && <>Page Not Found</>}
    </div>
  )
}