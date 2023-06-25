import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import parse from "html-react-parser";

import { usePages } from "..";

import './styles.css';

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
    <div className="d-flex flex-column flex-fill">
      {!selectedPage && <>Page Not Found</>}

      {selectedPage &&
        <div className="overflow-auto page-content mb-3 flex-fill">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="page-title me-3">{selectedPage?.title}</div>
            <div role="button" onClick={handleEditPage}><i className="fas fa-pen-to-square"></i></div>
          </div>
          <div>{parse(selectedPage.content)}</div>
        </div>
      }

      <div
        role="button"
        onClick={handleAddPage}
        className="text-end me-3 mb-3"
      >
        Add New Page
        <i className="fa-solid fa-plus ms-2"></i>
      </div>

    </div>
  )
}