import { useSession } from "next-auth/react";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
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

export default function Album({ searchKey }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [unavailableItems, setUnavailableItems] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn("google");
      return <div>Loading...</div>;
    },
  });

  const complete = (insertedItem) => {
    const newItems = items.map((item) => {
      return item.id === insertedItem.id ? insertedItem : item;
    });
    setItems(newItems);
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
          if (router.asPath !== `/users/${session.user.id}`) {
            router.push(`/users/${session.user.id}`);
          }
          const data = await response.json();
          setItems(data.items);
        };
        getData();
      }
    }
  }, [session]);

  useEffect(() => {
    const available = [];
    const unavailable = [];
    if (items) {
      items.forEach((item) => {
        if (Boolean(item.isAvailable) === false && !item.adminRemoved) {
          unavailable.push(item);
        } else if (Boolean(item.isAvailable) === true && !item.adminRemoved) {
          available.push(item);
        }
      });
      setAvailableItems(available);
      setUnavailableItems(unavailable);
    }
  }, [items]);

  let newAvailItems = availableItems;
  let newUnavailItems = unavailableItems;
  if (searchKey) {
    newAvailItems = availableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.description.toLowerCase().includes(searchKey.toLowerCase())
    );
    newUnavailItems = unavailableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.description.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  const handleClick = (button, id) => {
    if (button === "View item") {
      router.push(`/items/${id}`);
    }
    if (button === "sell") {
      router.push("/sellerpage");
    }
  };

  return (
    <>
      <CssBaseline />
      <main>
        <Typography
          variant="h4"
          align="center"
          color="text.secondary"
          paragraph
        >
          My Listed Items
        </Typography>

        <Typography variant="h5" align="left" color="text.secondary" paragraph>
          Available Items
        </Typography>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {newAvailItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <ItemCard
                  item={item}
                  handleClick={handleClick}
                  page="user"
                  setItems={setItems}
                  complete={complete}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        <Typography variant="h5" align="left" color="text.secondary" paragraph>
          Sold Items
        </Typography>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {newUnavailItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <ItemCard
                  item={item}
                  handleClick={handleClick}
                  page="user"
                  sold="sold"
                  setItems={setItems}
                  complete={complete}
                />
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
          MiddMarkit
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}
