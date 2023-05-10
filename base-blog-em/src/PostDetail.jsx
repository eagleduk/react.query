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

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (postId) => updatePost(postId),
  });

  if (isLoading) return <div>is Loading...</div>;
  if (isError)
    return (
      <>
        <h3>Oops, Error!</h3>
        <h4>{error.toString()}</h4>
      </>
    );

  console.log(updateMutation);

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <p style={{ color: "red" }}>Delete Error</p>}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting Post...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Deleted Post</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isError && <p style={{ color: "red" }}>Update Error</p>}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>Updating Post...</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>Updated Post</p>
      )}
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
