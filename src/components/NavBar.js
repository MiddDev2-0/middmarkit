import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import LoginWidgetComponent from "@/components/LoginWidget";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AppBarComponent({}) {
  const theme = createTheme();
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const handleClick = (button) => {
    if (button === "sell") {
      router.push("/sellerpage");
    }

    if (button === "home") {
      router.push("/");
    }

    if (button === "user items" && !!session && !!session.user) {
      router.push(`/users/${session.user.id}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LoginWidgetComponent />
          {/* <LoginWidget /> */}
          {/* <Typography variant="h6" color="inherit" noWrap>
            View Account Info
          </Typography> */}
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => handleClick("home")}>
                Home
              </Button>
              <Button variant="outlined" onClick={() => handleClick("sell")}>
                Sell
              </Button>

              {!!session && !!session.user && (
                <Button
                  variant="outlined"
                  onClick={() => handleClick("user items")}
                >
                  My items
                </Button>
              )}
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
