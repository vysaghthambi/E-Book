import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Outlet } from "react-router-dom";

import { PAGES_ITEM, PageType } from "../../types"
import PagesList from "./PagesList";

type PagesContextType = {
  pages: PageType[];
  pagesMap: Map<string, PageType>;
};

const PagesContext = createContext<PagesContextType | null>(null);

export function usePages() {
  return useContext(PagesContext) as PagesContextType;
}

export default function Pages() {
  const [pages, setPages] = useState<PageType[] | null>(null);

  useEffect(() => {
    const storedPages = localStorage.getItem(PAGES_ITEM);

    if (!storedPages) return;

    const parsedData = JSON.parse(storedPages);
    setPages(parsedData ? parsedData : []);
  }, []);

  const pagesMap = useMemo(() => {
    if (!pages) return undefined;

    return new Map(pages.map(page => [page.id, page]));
  }, [pages])

  const pagesContext = useMemo<PagesContextType | undefined>(() => {
    if (!pages || !pagesMap) return undefined;

    return { pages, pagesMap }
  }, [pages, pagesMap])

  return (
    <>
      {pages &&
        pagesContext &&
        <PagesContext.Provider value={pagesContext}>
          <div>
            <div>
              <PagesList />
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </PagesContext.Provider>
      }

      {!pages && <>loading...</>}
    </>
  );
}