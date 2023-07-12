import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import SearchBar from "@/components/SearchBar";
import { Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import LoginWidgetComponent from "@/components/LoginWidget";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AppBarComponent({ search, searchKey }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = (button) => {
    if (button === "sell" && !!session) {
      router.push("/items/new");
    }
    if (button === "sell" && !session) {
      router.push("/users/signin");
    }
    if (button === "home") {
      router.push("/");
    }
    if (button === "user items" && !!session && !!session.user) {
      router.push(`/users/${session.user.id}`);
    }
  };

  return (
    <>
      <AppBar position="relative" sx={{ width: "100%" }}>
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
          </Stack>
        </Container>
      </Box>
    </>
  );
}
