import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { PAGES_ITEM, PageType } from "../../types"
import PageCard from "./PageCard";

export default function Pages() {
  const { pageId } = useParams();

  const navigate = useNavigate();

  const [pages, setPages] = useState<PageType[] | null>(null);

  useEffect(() => {
    const storedPages = localStorage.getItem(PAGES_ITEM);

    setPages(storedPages ? JSON.parse(storedPages) : []);
  }, []);

  useEffect(() => {
    if (!pages?.length) return;
    if (pageId) return;

    navigate(pages[0].id);
  }, [navigate, pageId, pages]);

  return (
    <>
      {pages &&
        <div>
          <div>
            {pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>

          <div>
            <Outlet />
          </div>
        </div>
      }

      {!pages && <>loading...</>}
    </>
  );
}