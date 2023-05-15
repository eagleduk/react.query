import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ paramPage = initialUrl }) => fetchUrl(paramPage),
    getNextPageParam: (lastPage) => lastPage.next,
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.map((people) => {
            return (
              <Species
                key={people.name}
                name={people.name}
                language={people.language}
                averageLifespan={people.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
