export const getAllBlogs = () => {
  return fetch("http://localhost:8088/posts?_embed=likes&_expand=topic").then(
    (res) => res.json()
  );
};

export const getBlogById = (blogId) => {
  return fetch(
    `http://localhost:8088/posts/?id=${blogId}&_embed=likes&_expand=topic&_expand=user`
  ).then((res) => res.json());
};
