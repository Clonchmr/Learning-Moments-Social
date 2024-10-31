export const AddNewLike = (post) => {
  return fetch(`http://localhost:8088/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

export const getLikes = () => {
  return fetch(`http://localhost:8088/likes?_expand=post`).then((res) =>
    res.json()
  );
};

export const deleteLike = (likeId) => {
  return fetch(`http://localhost:8088/likes/${likeId}`, {
    method: "DELETE",
  });
};
