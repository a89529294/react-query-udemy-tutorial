import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};
const fetcher = ({ pageParam = initialUrl }) => fetchUrl(pageParam);

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery("sw-people", fetcher, {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });
  if (isLoading) return <h1 className="loading">loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  return (
    <>
      {isFetching && <h1 className="loading">loading...</h1>}
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        initialLoad={false}>
        {data.pages.map((pageData) =>
          pageData.results.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColir={person.hair_color}
              eyeColor={person.eye_color}></Person>
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
