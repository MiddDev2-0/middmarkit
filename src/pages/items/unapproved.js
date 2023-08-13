// import { useSession } from "next-auth/react";
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

export default function Album({}) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [unapprovedItems, setUnapprovedItems] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push(`/users/signin`);
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
            throw new Error(response.statusText);
          }
          const data = await response.json();
          if (Boolean(data.reviewerStatus) === false) {
            router.push("/");
          }
        };
        getData();
      }
    }
  }, [session]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/items`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setItems(data);
    };
    getData();
  }, [session]);

  useEffect(() => {
    const unapproved = items.filter(
      (item) =>
        Boolean(item.adminApproved) === false &&
        Boolean(item.adminRemoved) !== true
    );
    setUnapprovedItems(unapproved);
  }, [items]);

  const handleClick = (button, id) => {
    if (button === "View item") {
      router.push(`/items/${id}`);
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
          Approve Items to Post
        </Typography>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {unapprovedItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <ItemCard
                  item={item}
                  handleClick={handleClick}
                  page="unapproved"
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
