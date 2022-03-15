import Link from "next/link";
import React, { useContext, useState, useEffect, useRef } from "react";
import { ContextCountries } from "../context/CountriesProvider";
import styles from "./Header.module.css";
import { BiNews } from "react-icons/bi";
export const countriesISO3166_1 = [
  // { iso: "mx", name: "México" },
  { iso: "ar", name: "Argentina" },
  { iso: "br", name: "Brasil" },
  { iso: "ca", name: "Canadá" },
  { iso: "us", name: "Estados Unidos" },
  { iso: "ua", name: "Ucrania" },
  { iso: "ru", name: "Rusia" },
];

function Header() {
  const refNav = useRef();
  const { setCountryCode } = useContext(ContextCountries);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectCountry = (country) => {
    setCountryCode(country.toLowerCase());
  };
  const handleClickBtn = () => {
    const $nav = refNav.current;
    if (!$nav.style.height) {
      $nav.style.height = `${$nav.offsetHeight}px`; //set height
    }
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className={styles.newsHeader}>
        <h1 className={styles.logo}>
          <Link href={`/`}>
            <a>Global News</a>
          </Link>
        </h1>
        <BiNews onClick={handleClickBtn} className={styles.headerIcon} />
        <nav ref={refNav} className={`${styles.newsNav} `}>
          <ul className={`${styles.newsList}`}>
            {countriesISO3166_1.map(({ iso, name }, i) => (
              <li key={i} className={styles.newsLink}>
                <Link
                  replace
                  href={`/news/${iso}`}
                  onClick={() => selectCountry(iso)}
                >
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <nav
        ref={refNav}
        className={`${styles.newsMobNav} ${isMenuOpen ? styles.navIsOpen : ""}`}
      >
        <ul
          className={`${styles.newsMobList} ${
            isMenuOpen ? styles.listIsOpen : ""
          }`}
        >
          {countriesISO3166_1.map(({ iso, name }, i) => (
            <li onClick={handleClickBtn} key={i} className={styles.newsLink}>
              <Link
                replace
                href={`/news/${iso}`}
                onClick={() => {
                  selectCountry(iso);
                }}
              >
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        onClick={handleClickBtn}
        className={`${styles.navMobWrapper}
        ${isMenuOpen ? styles.wrapperIsOpen : ""}`}
      ></div>
    </>
  );
}

export default Header;
