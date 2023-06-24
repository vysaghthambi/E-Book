import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePages } from ".."
import PageCard from "./PageCard";

export default function PagesList() {
  const { pageId } = useParams();

  const navigate = useNavigate();

  const { pages } = usePages();

  useEffect(() => {
    if (!pages?.length) return;
    if (pageId) return;

    navigate(pages[0].id);
  }, [navigate, pageId, pages]);

  return (
    <>
      {pages.map((page) => (
        <PageCard key={page.id} page={page} />
      ))}
    </>
  )
}