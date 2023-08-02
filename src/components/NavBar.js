import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import SearchBar from "@/components/SearchBar";
import { Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import LoginWidget from "@/components/LoginWidget";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function AppBarComponent({ search, searchKey }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();

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
    <>
      <AppBar position="relative" sx={{ p: 0, m: 0, width: "100%" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, pl: [1, 1.5], fontSize: [20, 24] }}
            onClick={() => router.push(`/`)}
          >
            middmarkit
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {(router.pathname === "/" ||
              router.pathname.startsWith("/users/")) && (
              <Box sx={{ flex: 1, pr: !!session ? 1 : [2, 3] }}>
                <SearchBar searchKey={searchKey} search={search} />
              </Box>
            )}
            <LoginWidget />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 3,
          pb: 2,
        }}
      >
        <Container maxWidth="md">
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
          <Stack
            sx={{ mt: 2 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {!!session && !!session.user && !!user && !!user.reviewerStatus && (
              <Button
                variant={
                  router.pathname === "/items/removed"
                    ? "contained"
                    : "outlined"
                }
                color="warning"
                onClick={() => router.push("/items/removed")}
              >
                Removed Items
              </Button>
            )}

            {!!session && !!session.user && !!user && !!user.reviewerStatus && (
              <Button
                variant={
                  router.pathname === "/items/unapproved"
                    ? "contained"
                    : "outlined"
                }
                color="success"
                onClick={() => router.push("/items/unapproved")}
              >
                Approve Items
              </Button>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
