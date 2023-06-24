import { useCallback, useMemo } from "react";
import { v4 as uuid } from "uuid";

import PageForm from "../PageForm";
import { PageType } from "../../types";

export default function AddPage() {
  const id = uuid();

  const defaultValues = useMemo<PageType>(() => ({ id, title: "", content: "" }), [id]);

  const onSubmit = useCallback((data: PageType) => {
    return new Promise((resolve, reject) => {
      try {
        const pages = localStorage.getItem("pages");

        let updatedPages: PageType[];

        if (pages) {
          updatedPages = [...JSON.parse(pages), data];
        } else {
          updatedPages = [data];
        }

        localStorage.setItem("pages", JSON.stringify(updatedPages));

        resolve("Added page successfully");
      } catch (error) {
        reject(error)
      }
    })
  }, []);

  return (
    <>
      <PageForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  );
}