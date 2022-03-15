import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { ContextCountries } from "../context/CountriesProvider";
// import Header from "./Header";
const DynamicHeader = dynamic(() => import("./Header"));
function Layout({ children }) {
  const { refLastDiv, requestError } = useContext(ContextCountries);

  return (
    <>
      <DynamicHeader />
      <p>{requestError}</p>
      {children}
      <div
        ref={refLastDiv}
        style={{ background: "red" }}
        className="obsever"
      ></div>
    </>
  );
}

export default Layout;
