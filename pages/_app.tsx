import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { themes } from "../themes";
import { meta } from "../constants/meta";
import Head from "next/head";
import GlobalContext from "../context/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        {/* <link rel="icon" href="/favicon.svg" /> */}
        <link rel="icon" href={meta.favicon} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="application-name" content="carlomigueldy" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content={meta.keywords.join(", ")} />
        <meta name="environment" content={meta.environment} />
        <meta name="author" content={meta.author} />
        <link rel="canonical" href={meta.url} />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.imageUrl} />
        <meta property="og:locale" content={meta.locale} />

        {/* Twitter */}
        <meta property="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:url" content={meta.url} />
        <meta property="twitter:card" content="player" />
        <meta property="twitter:creator" content={meta.twitterHandle} />
        <meta property="twitter:site" content={meta.twitterHandle} />
        <meta property="twitter:image" content={meta.imageUrl} />
        <meta property="twitter:image:src" content={meta.imageUrl} />
        <meta property="twitter:image:alt" content={meta.imageAlt} />

        {/* Forem */}
        <meta property="forem:name" content={meta.title} />
        <meta property="forem:logo" content={meta.imageUrl} />
        <meta property="forem:domain" content={meta.url} />
      </Head>

      <ChakraProvider theme={themes.default}>
        <GlobalContext.Provider value={{ walletAddress: null }}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
