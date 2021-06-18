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
    return await fetch(`/api/search.json`).then(async (res) => await res.json())
}

export async function fetchAllCategories() {
    return await fetch(`/api/categories.json`).then(
        async (res) => await res.json()
    )
}

export async function fetchCategorie(slug: string) {
    return await fetch(`/api/categories/${slug}.json`).then(
        async (res) => await res.json()
    )
}

export async function fetchAllTags() {
    return await fetch(`/api/tags.json`).then(
        async (res) => await res.json()
    )
}

export async function fetchTag(slug: string) {
    return await fetch(`/api/tags/${slug}.json`).then(
        async (res) => await res.json()
    )
}
