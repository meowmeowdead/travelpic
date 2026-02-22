export type TResource<D> = {
	resource: D,
}
export type TResourcePaginated<D> = {
	resource: {
		data: D,
		links: {
			first: string,
			last: string | null,
			prev: string | null,
			next: string | null
		},
		meta: {
			current_page: number,
			current_page_url: string,
			from: number,
			path: string,
			per_page: number,
			to: number
		}
	}
}

export type TPostData = {
	id: number,
	name: string,
	description: string | null,
	coordinates: {
		lat: number,
		lng: number
	},
	updated_at: string,
	created_at: string
}

export type TFormError = Record<string, string[]>