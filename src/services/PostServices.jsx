export const CreatePost = (newPost) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => res.json());
};
