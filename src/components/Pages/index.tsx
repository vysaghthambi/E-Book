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
    console.log("inside")
    const storedPages = localStorage.getItem(PAGES_ITEM);

    if (!storedPages) return;

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
      {pages &&
        pagesContext &&
        <PagesContext.Provider value={pagesContext}>
          <div className="d-flex flex-fill bg-white">
            <div className="pagelist bg-primary bg-opacity-25">
              <PagesList />
            </div>
            <div className="d-flex flex-fill">
              <Outlet />
            </div>
          </div>
        </PagesContext.Provider>
      }

      {!pages && <>loading...</>}
    </>
  );
}