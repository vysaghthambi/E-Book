import React, { useCallback, useState } from "react"
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

import { API_KEY, PageType } from "../../types"

export type PageFormPropType = {
    defaultValues: PageType;
    onSubmit: (data: PageType) => Promise<unknown>;
    handleBack: VoidFunction;
}

export default function PageForm({ defaultValues, onSubmit, handleBack }: PageFormPropType) {
    const [title, setTitle] = useState<string>(defaultValues.title);
    const [content, setContent] = useState<string>(defaultValues.content);

    const navigate = useNavigate();

    const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleContentChange = useCallback((content: string) => {
        setContent(content)
    }, [])

    const handleSubmit = useCallback(() => {
        const data: PageType = {
            ...defaultValues,
            title,
            content
        }

        onSubmit(data)
            .then((res) => {
                console.log(res);
                navigate(`/pages/${defaultValues.id}`);
            })
            .catch((err) => console.error("Unable to add page", err));

    }, [content, defaultValues, navigate, onSubmit, title])

    return (
        <form onSubmit={handleSubmit} className="w-100 h-100">
            <div className="d-flex flex-column p-5 h-100">
                <div className="form-group mb-4">
                    <label htmlFor="pageTitle">Page Title</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="pageTitle"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-100 input-group-lg"
                            placeholder="Page Title"
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>

                <div className="form-group flex-fill mb-4">
                    <Editor
                        apiKey={API_KEY}
                        value={content}
                        onEditorChange={handleContentChange}
                        init={{ height: "100%" }}
                    />
                </div>

                <div className="d-flex justify-content-end g-2">
                    <div>
                        <button className="btn btn-success" type="submit">
                            Save Page
                        </button>
                    </div>
                    <div className="ms-3">
                        <button className="btn btn-primary" onClick={handleBack}>
                            Back To Book
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}