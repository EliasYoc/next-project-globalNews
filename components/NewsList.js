import { useContext, useEffect } from "react";
import useSWR from "swr";
import { ContextCountries } from "../context/CountriesProvider";
import Cards from "./Cards";
function NewsList({ numPage, country }) {
  const { origin, pathname, setRequestError, setCardsObserve } =
    useContext(ContextCountries);
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `${origin}${pathname}?country=${country}&pageSize5=&page=${numPage}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );
  useEffect(() => {
    if (data?.status === "error") setRequestError(data?.message);
  }, [data?.status, data?.message, setRequestError]);
  useEffect(() => {
    const $cards = document.querySelectorAll(".newsCard");
    setCardsObserve($cards);
  }, [setCardsObserve, data]);

  return (
    <>
      {data?.articles?.map(
        (
          { author, description, urlToImage, publishedAt, source, title, url },
          i
        ) => (
          <Cards
            key={i}
            author={author}
            description={description}
            imgUrl={urlToImage}
            publishedAt={publishedAt}
            source={source}
            title={title}
            url={url}
          />
        )
      )}
    </>
  );
}

export default NewsList;
