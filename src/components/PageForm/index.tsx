import React, { useCallback, useState } from "react"
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

import { PageType } from "../../types"

export type PageFormPropType = {
    defaultValues: PageType;
    onSubmit: (data: PageType) => Promise<unknown>;
}

export default function PageForm({ defaultValues, onSubmit }: PageFormPropType) {
    const [title, setTitle] = useState<string>(defaultValues.title);
    const [content, setContent] = useState<string>(defaultValues.content);

    const navigate = useNavigate();

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleContentChange = useCallback((content: string) => {
        setContent(content)
    }, [])

    const handleBack = useCallback(() => {
        navigate("/pages")
    }, [navigate])

    const handleSubmit = useCallback(() => {
        const data: PageType = {
            ...defaultValues,
            title,
            content
        }

        onSubmit(data)
            .then((res) => {
                console.log(res);
                handleBack();
            })
            .catch((err) => console.error("Unable to add page", err));

    }, [content, defaultValues, handleBack, onSubmit, title])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="pageTitle">Page Title</label>
                <input type="text" id="pageTitle" name="title" value={title} onChange={handleTitleChange} />
            </div>

            <div className="form-group">
                <Editor value={content} onEditorChange={handleContentChange} />
            </div>

            <button type="submit">Save Page</button>
            <button onClick={handleBack}>Back To Book</button>
        </form>
    )
}