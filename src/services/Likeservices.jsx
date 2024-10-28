export const AddNewLike = (post) => {
  return fetch(`http://localhost:8088/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};
