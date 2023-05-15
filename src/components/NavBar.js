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

export default function AppBarComponent({ search, searchKey }) {
  const theme = createTheme();
  const { data: session } = useSession();
  const router = useRouter();
  console.log("router");
  console.log(router);
  // states to highlight the button that is clicked
  const [homeVariant, setHomeVariant] = useState(
    router.pathname === "/" ? "contained" : "outlined"
  );
  const [sellVariant, setSellVariant] = useState(
    router.pathname === "/items/new" ? "contained" : "outlined"
  );
  const [itemsVariant, setItemsVariant] = useState(
    router.pathname === "/users/[...id]" ? "contained" : "outlined"
  );

  const handleClick = (button) => {
    if (button === "sell") {
      router.push("/items/new");
      setSellVariant("contained");
      setHomeVariant("outlined");
      setItemsVariant("outlined");
    }
    if (button === "home") {
      router.push("/");
      setHomeVariant("contained");
      setSellVariant("outlined");
      setItemsVariant("outlined");
    }
    if (button === "user items" && !!session && !!session.user) {
      router.push(`/users/${session.user.id}`);
      setItemsVariant("contained");
      setSellVariant("outlined");
      setHomeVariant("outlined");
    }
  };

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
          <SearchBar searchKey={searchKey} search={search} />
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
              <Button variant={homeVariant} onClick={() => handleClick("home")}>
                Home
              </Button>
              <Button variant={sellVariant} onClick={() => handleClick("sell")}>
                Sell
              </Button>
              {!!session && !!session.user && (
                <Button
                  variant={itemsVariant}
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
