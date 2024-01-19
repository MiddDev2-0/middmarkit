import Script from "next/script";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../material/theme";
import createEmotionCache from "../material/createEmotionCache";
import Container from "@mui/material/Container";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import * as gtag from "../lib/gtag";

import PropTypes from "prop-types";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const [searchKey, setSearchKey] = useState("");
  const search = (searchString) => {
    setSearchKey(searchString);
  };

  useEffect(() => {
    if (router !== "/") {
      setSearchKey("");
    }
  }, [router, setSearchKey]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container
          disableGutters
          maxWidth="xl"
          sx={{
            px: 0,
          }}
        >
          <SessionProvider session={session}>
            <NavBar searchKey={searchKey} search={search} />
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
        page_path: window.location.pathname,
        user_id: ${userID},
      });
    `,
              }}
            />
            <Component {...pageProps} searchKey={searchKey} />
          </SessionProvider>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
  emotionCache: PropTypes.func,
};
