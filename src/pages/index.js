import { useSession } from "next-auth/react";
import * as React from "react";
import { Pagination, Stack } from "@mui/material";
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
import PropTypes from "prop-types";

function Copyright() {
  const newLocal = "https://mui.com/";
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={newLocal}>
        middmarkit.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Album({ searchKey }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const { data: session } = useSession();
  const [isReviewer, setIsReviewer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

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
          setIsReviewer(data.reviewerStatus);
        };
        getData();
      }
    }
  }, [session]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/items", { method: "GET" });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();

      const newData = data.filter(
        (item) =>
          !item.adminRemoved && !!item.isAvailable && !!item.adminApproved
      );
      setItems(newData);
    };
    getData();
  }, []);

  let newItems = items;

  if (searchKey) {
    newItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.description.toLowerCase().includes(searchKey.toLowerCase())
    );
  }

  const complete = (removedItem) => {
    const getData = async () => {
      const response = await fetch("/api/items", { method: "GET" });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const newData = data.filter(
        (item) =>
          !item.adminRemoved && !!item.isAvailable && !!item.adminApproved
      );
      setItems(newData);
    };
    getData();
    const newData = items.map((item) => {
      return item.id === removedItem.id ? removedItem : item;
    });
    setItems(newData);
  };

  const handleClick = (button, id) => {
    if (button === "View item" && !!session) {
      router.push(`/items/${id}`);
    }

    if (button === "View item" && !session) {
      router.push(`/users/signin`);
    }

    if (button === "sell") {
      router.push("/items/new");
    }
  };

  const sortedItems = Array.from(newItems).sort((a, b) =>
    b.datePosted.localeCompare(a.datePosted)
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const itemsToRender = sortedItems.slice(startIndex, endIndex);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: "20px",
          pb: "20px",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" paragraph color="secondary">
            Welcome to the Middlebury Resale Community!
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 0 }}>
        {/* End hero unit */}
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          alignItems="center"
          justify="center"
        >
          {itemsToRender.map((item) => (
            <Grid item key={item.id} xs={6} sm={4} md={3}>
              <ItemCard
                item={item}
                handleClick={handleClick}
                complete={complete}
                isReviewer={isReviewer}
              />
            </Grid>
          ))}
        </Grid>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Pagination
            count={Math.ceil(sortedItems.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Midd Markit
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
