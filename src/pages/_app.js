import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../material/theme";
import createEmotionCache from "../material/createEmotionCache";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { styled } from "@mui/material/styles";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const Footer = styled("footer")(({ theme: styledTheme }) => ({
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: styledTheme.spacing(5),
    paddingTop: styledTheme.spacing(2),
  }));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Midd Markit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main>
          <Container>
            <Typography variant="h2" align="center">
              MiddMarkit
            </Typography>
            <Component {...pageProps} />
          </Container>
        </main>

        <Footer>CS312 Final Project</Footer>
      </ThemeProvider>
    </CacheProvider>
  );
}
