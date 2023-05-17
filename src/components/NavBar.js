import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import SearchBar from "@/components/SearchBar";
import { Typography } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import LoginWidgetComponent from "@/components/LoginWidget";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function AppBarComponent({ search, searchKey }) {
  const theme = createTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();

  const handleClick = (button) => {
    if (button === "sell") {
      router.push("/items/new");
    }
    if (button === "remove") {
      router.push("/items/removed");
    }
    if (button === "home") {
      router.push("/");
    }
    if (button === "user items" && !!session && !!session.user) {
      router.push(`/users/${session.user.id}`);
    }
  };

  useEffect(() => {
    if (session) {
      if (session.user) {
        const getData = async () => {
          const response = await fetch(`/api/users/${session.user.id}`, {
            method: "GET",
          });
          if (!response.ok) {
            console.log("error");
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setUser(data);
        };
        getData();
      }
    }
  }, [session]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LoginWidgetComponent />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          />
          {(router.pathname === "/users/[...id]" ||
            router.pathname === "/") && (
            <SearchBar searchKey={searchKey} search={search} />
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 3,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Stack sx={{}} direction="row" spacing={2} justifyContent="center">
              <Button
                variant={router.pathname === "/" ? "contained" : "outlined"}
                onClick={() => handleClick("home")}
              >
                Home
              </Button>
              <Button
                variant={
                  router.pathname === "/items/new" ? "contained" : "outlined"
                }
                onClick={() => handleClick("sell")}
              >
                Sell
              </Button>
              {!!session && !!session.user && (
                <Button
                  size="large"
                  variant={
                    router.pathname === "/users/[...id]"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleClick("user items")}
                >
                  My items
                </Button>
              )}
              {!!session &&
                !!session.user &&
                !!user &&
                !!user.reviewerStatus && (
                  <Button
                    size="large"
                    variant={
                      router.pathname === "/items/removed"
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleClick("remove")}
                  >
                    Removed Items
                  </Button>
                )}
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
