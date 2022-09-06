import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      "sw-species",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      { getNextPageParam: (lastPage) => lastPage.next || undefined }
    );
  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1 className="loading">loading...</h1>;
  return (
    <>
      {isFetching && <h1 className="loading">loading...</h1>}
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        initialLoad={false}>
        {data.pages.map((pageData) =>
          pageData.results.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}></Species>
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
