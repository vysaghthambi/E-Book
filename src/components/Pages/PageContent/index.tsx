import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import parse from "html-react-parser";

import { usePages } from "..";

export default function PageContent() {
  const { pageId } = useParams();

  if (!pageId) throw new Error("Page Id not found");

  const navigate = useNavigate();

  const { pagesMap } = usePages();

  const selectedPage = useMemo(() => pagesMap.get(pageId), [pageId, pagesMap]);

  const handleAddPage = useCallback(() => {
    navigate("/add")
  }, [navigate])

  const handleEditPage = useCallback(() => {
    navigate("edit")
  }, [navigate])

  return (
    <div className="d-flex flex-column flex-fill p-3">
      {!selectedPage && <>Page Not Found</>}

      {selectedPage &&
        <>
          <div className="d-flex justify-content-center">
            <div>{selectedPage?.title}</div>
            <div role="button" onClick={handleEditPage}>Edit</div>
          </div>
          <div className="flex-fill">{parse(selectedPage.content)}</div>
        </>
      }

      <div
        role="button"
        onClick={handleAddPage}
        className="text-end"
      >
        Add New Page
      </div>

    </div>
  )
}