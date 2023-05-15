import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  console.log("url...", url);
  const response = await fetch(url);
  console.log("fetchUrl...", response);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next,
  });

  if (isLoading) return <div className="loading">Loading....</div>;
  if (isError) return <div>Error! {error.toString()}</div>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div className="loading">Loading....</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((people) => {
            return (
              <Person
                key={people.name}
                name={people.name}
                hairColor={people.hair_color}
                eyeColor={people.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
