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

import PropTypes from "prop-types";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}) {
  const router = useRouter();

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
    <>
      <SessionProvider session={pageProps.session}>
        {/* Google Tag Manager - Global base code */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=GTM-PLQLCJJQ`}
        />
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
              <NavBar searchKey={searchKey} search={search} />
              <Component {...pageProps} searchKey={searchKey} />
            </Container>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
  emotionCache: PropTypes.func,
};
