import { useMemo } from "react";
import { useParams } from "react-router-dom";

import parse from "html-react-parser";

import { usePages } from "..";

export default function PageContent() {
  const { pageId } = useParams();

  if (!pageId) throw new Error("Page Id not found");

  const { pagesMap } = usePages();

  const selectedPage = useMemo(() => pagesMap.get(pageId), [pageId, pagesMap]);

  return (
    <div>
      {selectedPage && <>{parse(selectedPage.content)}</>}

      {!selectedPage && <>Page Not Found</>}
    </div>
  )
}