import { useSession } from "next-auth/react";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
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
const ItemSection = ({
  title,
  items,
  handleClick,
  setItems,
  complete,
  sold,
}) => (
  <>
    <Typography
      variant="h6"
      align="left"
      color="text.secondary"
      paragraph
      sx={{ mt: 4 }}
    >
      {title}
    </Typography>

    <Container sx={{ py: 4 }} maxWidth="md">
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <ItemCard
              item={item}
              handleClick={handleClick}
              page="user"
              setItems={setItems}
              complete={complete}
              sold={sold}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
);

export default function Album({ searchKey }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [unavailableItems, setUnavailableItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);

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
    const pending = [];
    if (items) {
      items.forEach((item) => {
        if (!item.isAvailable && !item.adminRemoved) {
          unavailable.push(item);
        } else if (
          !!item.isAvailable &&
          !item.adminRemoved &&
          !!item.adminApproved
        ) {
          available.push(item);
        } else if (
          !item.adminApproved &&
          !item.adminRemoved &&
          !!item.isAvailable
        ) {
          pending.push(item);
        }
      });
      setAvailableItems(available);
      setUnavailableItems(unavailable);
      setPendingItems(pending);
    }
  }, [items]);

  let newAvailItems = availableItems;
  let newUnavailItems = unavailableItems;
  let newPendingItems = pendingItems;
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
    newPendingItems = pendingApproval.filter(
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

      <Typography variant="h4" align="center" paragraph sx={{ mt: 3 }}>
        My Listed Items
      </Typography>
      <Container sx={{ mb: 4 }}>
        <ItemSection
          title="Available Items"
          items={newAvailItems}
          handleClick={handleClick}
          setItems={setItems}
          complete={complete}
        />
        <Divider sx={{ my: 2 }} />
        <ItemSection
          title="Items Pending Approval"
          items={newPendingItems}
          handleClick={handleClick}
          setItems={setItems}
          complete={complete}
        />
        <Divider sx={{ my: 2 }} />
        <ItemSection
          title="Sold Items"
          items={newUnavailItems}
          handleClick={handleClick}
          setItems={setItems}
          complete={complete}
          sold="sold"
        />
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", py: 6 }} component="footer">
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
