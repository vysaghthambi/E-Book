import { useNavigate, useParams } from "react-router-dom"
import { PageType } from "../../../../types"

import "./styles.css"
import { useCallback, useMemo } from "react";
import clsx from "clsx";

type PageCardPropsType = { page: PageType }

export default function PageCard({ page }: PageCardPropsType) {
	const { pageId } = useParams();

	const navigate = useNavigate();

	const isActive = useMemo(() => page.id === pageId, [page.id, pageId])

	const handleClick = useCallback(() => {
		navigate(page.id)
	}, [navigate, page.id])

	return (
		<div
			role="button"
			onClick={handleClick}
			className={clsx(
				"page-card text-primary",
				{ "bg-primary text-white active": isActive }
			)}
		>
			{page.title}
		</div>
	)
}