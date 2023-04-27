import { useState } from "react";
// import styles from "../styles/SellerForm.module.css";
// import PropTypes from "prop-types";
// import { useEffect } from "react";
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
// import { useRouter } from "next/router";

const theme = createTheme();

// const [allFieldsPopulated, setAllFieldsPopulated] = useState(false);
const cloud_name = "middmarkit";
const api_key = "765198598371986";
const upload_preset = "dsxfrbyg";

export default function SellerForm({}) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // const signatureResponse = getSignature();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("api_key", api_key);

    // data.append("signature", signatureResponse.data.signature)
    // data.append("timestamp", signature.data.timestamp)
    const cloudinaryResponse = fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
    console.log(cloudinaryResponse);
    console.log(cloudinaryResponse.secure_url);
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
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)}
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
              sx={{ mt: 3, mb: 2 }}
            >
              Post your item!
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
