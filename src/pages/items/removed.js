// import { useSession } from "next-auth/react";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
// import { signIn } from "next-auth/react";
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

const theme = createTheme();

export default function Album({}) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  //   const { data: session } = useSession({
  //     required: true,
  //     onUnauthenticated() {
  //       // The user is not authenticated, handle it here.
  //       signIn("google");
  //       return <div>Loading...</div>;
  //     },
  //   });

  const complete = (insertedItem) => {
    const newItems = items.map((item) => {
      return item.id === insertedItem.id ? insertedItem : item;
    });
    setItems(newItems);
  };

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
  }, []);

  useEffect(() => {
    const removed = items.filter((item) => Boolean(item.adminRemoved) === true);
    setRemovedItems(removed);
  }, [items]);

  const handleClick = (button, id) => {
    if (button === "View item") {
      router.push(`/items/${id}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
            {removedItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <ItemCard
                  item={item}
                  handleClick={handleClick}
                  page="remove"
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
    </ThemeProvider>
  );
}
