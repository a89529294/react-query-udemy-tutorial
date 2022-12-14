import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(currentPage) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
  );

  //   await new Promise((r) => setTimeout(r, 2000));
  return response.json();
}

export function Posts() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    currentPage < maxPostPage &&
      queryClient.prefetchQuery(["posts", currentPage + 1], () =>
        fetchPosts(currentPage + 1)
      );
  }, [currentPage, queryClient]);

  if (isLoading) return <h3>loading...</h3>;
  if (isError)
    return (
      <>
        <h1>error</h1>
        <p>{error.toString()}</p>
      </>
    );
  if (isFetching) return <h3>fetching...</h3>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => --p)}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage === maxPostPage}
          onClick={() => setCurrentPage((p) => ++p)}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
