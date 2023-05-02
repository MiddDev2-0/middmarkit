import { useSession } from "next-auth/react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginWidget from "@/components/LoginWidget";

import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import ItemCard from "@/components/ItemCard";

function Copyright() {
  const newLocal = "https://mui.com/";
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={newLocal}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Authentication() {
  const { data: status } = useSession({ required: true }); //session

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <Album LoginWidgetComponent={LoginWidget} />;
}

export function Album({ LoginWidgetComponent }) {
  const router = useRouter();
  // const [currentItem,setCurrentItem] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/items", { method: "GET" });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setItems(data);
    };
    getData();
  }, []);

  const handleClick = (button, id) => {
    if (button === "View item") {
      router.push(`/items/${id}`);
    }

    if (button === "sell") {
      router.push("/sellerpage");
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
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome to MiddMarket! This is a web application where you can buy
              and sell items on the Middlebury Campus
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Home</Button>
              <Button variant="outlined" onClick={() => handleClick("sell")}>
                Sell
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {items.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <ItemCard item={item} handleClick={handleClick} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          MiddMarket
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
