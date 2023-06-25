import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Outlet } from "react-router-dom";

import { PAGES_ITEM, PageType } from "../../types"
import PagesList from "./PagesList";

import "./styles.css"

type PagesContextType = {
  pages: PageType[];
  pagesMap: Map<string, PageType>;
  handlePageUpdate: VoidFunction;
};

const PagesContext = createContext<PagesContextType | null>(null);

export function usePages() {
  return useContext(PagesContext) as PagesContextType;
}

export default function Pages() {
  const [pages, setPages] = useState<PageType[] | null>(null);
  const [pageUpdated, setPageUpdated] = useState<boolean>(false);

  const handlePageUpdate = useCallback(() => {
    setPageUpdated(prev => !prev)
  }, [])

  useEffect(() => {
    const storedPages = localStorage.getItem(PAGES_ITEM);

    if (!storedPages) {
      setPages([]);
      return;
    };

    const parsedData = JSON.parse(storedPages);
    setPages(parsedData ? parsedData : []);
  }, [pageUpdated]);

  const pagesMap = useMemo(() => {
    if (!pages) return undefined;

    return new Map(pages.map(page => [page.id, page]));
  }, [pages])

  const pagesContext = useMemo<PagesContextType | undefined>(() => {
    if (!pages || !pagesMap) return undefined;

    return { pages, pagesMap, handlePageUpdate }
  }, [handlePageUpdate, pages, pagesMap])

  return (
    <>
      {!pages && <>loading...</>}

      {!!pages?.length &&
        pagesContext &&
        <PagesContext.Provider value={pagesContext}>
          <div className="d-flex h-100 bg-white">
            <div className="pagelist overflow-auto left-container">
              <PagesList />
            </div>
            <div className="d-flex flex-fill right-container">
              <Outlet />
            </div>
          </div>
        </PagesContext.Provider>
      }

      {!pages?.length &&
        <div className="d-flex flex-column justigy-content-center align-items-center bg-white p-5">
          <div>No Pages Found</div>
          <a href="/add">Click here to add new page</a>
        </div>
      }
    </>
  );
}