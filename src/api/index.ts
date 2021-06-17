// GET /api/site.json
export async function fetchHexoConfig() {
    return await fetch('/api/config.json').then(async (res) => await res.json())
}

export async function fetchPostsList(currentPage: number) {
    return await fetch(`/api/posts/${currentPage}.json`).then(
        async (res) => await res.json()
    )
}

export async function fetchPostBySlug(slug: string) {
    return await fetch(`/api/articles/${slug}.json`).then(
        async (res) => await res.json()
    )
}

export async function fetchAllPost() {
    return await fetch(`/api/allpost.json`).then(
        async (res) => await res.json()
    )
}

export async function fetchSearch() {
    return await fetch(`/api/search.json`).then(
        async (res) => await res.json()
    )
}
