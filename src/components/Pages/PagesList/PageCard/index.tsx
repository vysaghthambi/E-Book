import { PageType } from "../../../../types"

type PageCardPropsType = { page: PageType }

export default function PageCard({ page }: PageCardPropsType) {
	return (
		<div>{page.title}</div>
	)
}