import Head from "next/head";
import PropTypes from "prop-types";
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
import { Pagination, Stack, useMediaQuery } from "@mui/material";

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
    <Container sx={{ py: 0 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        alignItems="center"
        justify="left"
      >
        {items.map((item) => (
          <Grid item key={item.id} xs={4} sm={3} md={2}>
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
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn("google");
      return <div>Loading...</div>;
    },
  });

  // Use useMediaQuery to get the current screen size
  const isExtraSmallScreen = useMediaQuery("(max-width: 599.95px)");
  const isSmallScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 959.95px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width: 960px) and (max-width: 1279.95px)"
  );

  // Update the number of items per page based on the screen size
  useEffect(() => {
    if (isExtraSmallScreen) {
      setItemsPerPage(6);
    } else if (isSmallScreen) {
      setItemsPerPage(8);
    } else if (isMediumScreen) {
      setItemsPerPage(12);
    } else {
      setItemsPerPage(6);
    }
  }, [isExtraSmallScreen, isSmallScreen, isMediumScreen]);

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
    newPendingItems = pendingItems.filter(
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

  // Available Items Pagination
  const [currentPageAvailable, setCurrentPageAvailable] = useState(1);
  // Ensure the same itemsPerPage value is used as in the "Available Items" section.

  const handlePageChangeAvailable = (event, page) => {
    setCurrentPageAvailable(page);
  };

  // Items Pending Approval Pagination
  const [currentPagePending, setCurrentPagePending] = useState(1);
  // Ensure the same itemsPerPage value is used as in the "Available Items" section.

  const handlePageChangePending = (event, page) => {
    setCurrentPagePending(page);
  };

  // Sold Items Pagination
  const [currentPageSold, setCurrentPageSold] = useState(1);
  // Ensure the same itemsPerPage value is used as in the "Available Items" section.

  const handlePageChangeSold = (event, page) => {
    setCurrentPageSold(page);
  };

  return (
    <>
      <Head>
        <title>My Posts - Middmarkit</title>{" "}
      </Head>
      <CssBaseline />

      <Typography
        variant="h4"
        align="center"
        paragraph
        sx={{ mt: 1 }}
        color="secondary"
      >
        My Listed Items
      </Typography>
      <Container sx={{ mb: 4 }}>
        <ItemSection
          title="Available Items"
          items={newAvailItems.slice(
            (currentPageAvailable - 1) * itemsPerPage,
            currentPageAvailable * itemsPerPage
          )}
          handleClick={handleClick}
          setItems={setItems}
          complete={complete}
        />
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Pagination
            count={Math.ceil(newAvailItems.length / itemsPerPage)}
            page={currentPageAvailable}
            onChange={handlePageChangeAvailable}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <ItemSection
          title="Items Pending Approval"
          items={newPendingItems.slice(
            (currentPagePending - 1) * itemsPerPage,
            currentPagePending * itemsPerPage
          )}
          handleClick={handleClick}
          setItems={setItems}
          complete={complete}
        />
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Pagination
            count={Math.ceil(newPendingItems.length / itemsPerPage)}
            page={currentPagePending}
            onChange={handlePageChangePending}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <ItemSection
          title="Sold Items"
          items={newUnavailItems.slice(
            (currentPageSold - 1) * itemsPerPage,
            currentPageSold * itemsPerPage
          )}
          handleClick={handleClick}
          setItems={setItems}
          complete={complete}
          sold="sold"
        />
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Pagination
            count={Math.ceil(newUnavailItems.length / itemsPerPage)}
            page={currentPageSold}
            onChange={handlePageChangeSold}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
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
Album.propTypes = {
  searchKey: PropTypes.string,
};
