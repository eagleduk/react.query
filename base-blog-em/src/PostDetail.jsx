import { useQuery, useMutation } from "@tanstack/react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const mutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  if (isLoading) return <div>is Loading...</div>;
  if (isError)
    return (
      <>
        <h3>Oops, Error!</h3>
        <h4>{error.toString()}</h4>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => mutation.mutate(post.id)}>Delete</button>
      {mutation.isError && <p style={{ color: "red" }}>Delete Error</p>}
      {mutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting Post...</p>
      )}
      {mutation.isSuccess && <p style={{ color: "green" }}>Delete Post</p>}
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
