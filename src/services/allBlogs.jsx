export const getAllBlogs = () => {
    return fetch("http://localhost:8088/posts?_embed=likes&_expand=topic").then(res => res.json())
}