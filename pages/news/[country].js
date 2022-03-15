import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import NewsList from "../../components/NewsList";
import { ContextCountries } from "../../context/CountriesProvider";

function Country() {
  const { setCountryCode, countryCode, numPages } =
    useContext(ContextCountries);

  const router = useRouter();
  const { country } = router.query;
  useEffect(() => setCountryCode(country || "mx"), [country, setCountryCode]);

  return (
    <div>
      <h2 className="gral-padding">{countryCode.toUpperCase()}</h2>
      <main className="all-news">
        {numPages.map((numPage, i) => (
          <NewsList key={i} numPage={numPage} country={countryCode} />
        ))}
      </main>
    </div>
  );
}

export default Country;
