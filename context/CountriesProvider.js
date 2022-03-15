import { createContext, useState, useEffect, useRef } from "react";
export const ContextCountries = createContext();

const CountriesProvider = ({ children }) => {
  const [countryCode, setCountryCode] = useState("mx");
  const [numPages, setNumPages] = useState([1]);
  const [requestError, setRequestError] = useState("");
  const [cardsObserve, setCardsObserve] = useState([]);
  const refLastDiv = useRef();

  useEffect(() => {
    const target = refLastDiv.current;
    let options = {
      root: null,
      rootMargin: "0px 0px 20px 0px",
      threshold: 0,
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setNumPages((prevNumPages) => [
            ...prevNumPages,
            prevNumPages.length + 1,
          ]);
        }
      });
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);
  useEffect(() => {
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // const $card = document.querySelector()
          entry.target.classList.add("animatedCardEntry");
          entry.target.classList.remove("animatedCardExit");
        } else {
          entry.target.classList.remove("animatedCardEntry");
          entry.target.classList.add("animatedCardExit");
        }
      });
    };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.08,
    };
    let observer = new IntersectionObserver(cb, options);

    cardsObserve.forEach((card) => observer.observe(card));
    return () => {
      cardsObserve.forEach((card) => observer.unobserve(card));
    };
  }, [cardsObserve]);

  const origin = "https://newsapi.org";
  const pathname = "/v2/top-headlines";

  const data = {
    origin,
    pathname,
    countryCode,
    setCountryCode,
    setNumPages,
    numPages,
    refLastDiv,
    requestError,
    setRequestError,
    setCardsObserve,
    cardsObserve,
  };
  return (
    <ContextCountries.Provider value={data}>
      {children}
    </ContextCountries.Provider>
  );
};

export default CountriesProvider;
