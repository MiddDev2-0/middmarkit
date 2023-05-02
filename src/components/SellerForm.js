import { useState } from "react";
// import styles from "../styles/SellerForm.module.css";
// import PropTypes from "prop-types";
import { useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useRouter } from "next/router";

const theme = createTheme();

// const [allFieldsPopulated, setAllFieldsPopulated] = useState(false);
const cloud_name = "middmarkit";
const api_key = "765198598371986";
const upload_preset = "ucwgvyiu";

export default function SellerForm({}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageID, setImageID] = useState(undefined);
  const [price, setPrice] = useState("");
  const [allFieldsPopulated, setAllFieldsPopulated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAllFieldsPopulated(name !== "" && description !== "" && price !== "");
  }, [name, description, price]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("api_key", api_key);

    // eslint-disable-next-line no-unused-vars
    const cloudinaryResponse = fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setImageID(response.public_id);
      });
  };

  const handlePost = () => {
    const newItem = {
      name: name,
      description: description,
      price: price,
      sellerId: 1,
      datePosted: new Date().toISOString(),
      isAvailable: true,
      images: imageID,
    };

    const getData = async () => {
      const testItem = {
        name: "Example Item",
        description: "This is an example item.",
        price: 100,
        sellerId: 1, // the ID of the seller (must exist in the User table)
        datePosted: "2023-05-02",
        isAvailable: true,
        images: "https://example.com/item.jpg",
      };

      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testItem),
      });
      console.log(newItem);
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data); // the newly created item object
    };

    getData();
  };

  //   (async () => {
  //     const response = await fetch(`/api/items`, {
  //       method: "POST",
  //       body: JSON.stringify(newItem),
  //       headers: new Headers({
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       }),
  //     });
  //     if (response.ok) {
  //       router.push(`/`);
  //     }
  //   })();
  // };

  const handleCancel = () => {
    router.push(`/`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sell your item:
          </Typography>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
            />
            <PhotoCamera />
          </IconButton>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="item-name"
                  name="itemName"
                  required
                  fullWidth
                  id="itemName"
                  label="Item Name"
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              onClick={handlePost}
              disabled={!allFieldsPopulated}
            >
              Post your item!
            </Button>
            <Button sx={{ mt: 2, mb: 2 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
