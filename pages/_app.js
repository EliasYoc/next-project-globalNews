import Layout from "../components/Layout";
import CountriesProvider from "../context/CountriesProvider";
import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <CountriesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CountriesProvider>
    </>
  );
}

export default MyApp;
