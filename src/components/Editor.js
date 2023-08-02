import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function Editor({ item }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageId, setImageId] = useState(undefined);
  const [price, setPrice] = useState("");
  const [allFieldsPopulated, setAllFieldsPopulated] = useState(false);
  const router = useRouter();

  const [seller, setSeller] = useState();
  const { data: session } = useSession();

  const [open, setOpen] = React.useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleOpenBackdrop = () => {
    setOpen(true);
  };

  useEffect(() => {
    setAllFieldsPopulated(
      name !== "" && description !== "" && price !== "" && imageId !== undefined
    );
  }, [name, description, price, imageId]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price);
      setDescription(item.description);
      setImageId(item.images);
    }
  }, [item]);

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
          setSeller(data);
        };
        getData();
      }
    }
  }, [session]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET
    );
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUD_API_KEY);

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_process.env.NEXT_PUBLIC_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setImageId(response.public_id);
        handleCloseBackdrop();
      });
  };

  const handleSave = () => {
    const updatedItem = {
      ...item,
      name: name,
      description: description,
      price: Math.round(+price),
      sellerId: seller.id,
      datePosted: new Date().toISOString(),
      isAvailable: true,
      images: imageId,
      adminRemoved: false,
      adminApproved: false,
    };

    //BAD REQUEST ERROR:

    fetch(`/api/items/${updatedItem.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));

    router.push(`/users/${session.id}`);
  };

  const handleCancel = () => {
    router.push(`/`);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Your Item
          </Typography>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={handleOpenBackdrop}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
            />
            <PhotoCamera />
          </IconButton>

          <div>
            <Backdrop sx={{ color: "#fff" }} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>

          {imageId && (
            <Box
              maxWidth={"400px"}
              component="img"
              alt="The house from the offer."
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/${imageId}`}
            />
          )}

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
                  inputProps={{
                    maxLength: 30,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  pattern="[0-9]+"
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
              fullWidth
              size="medium"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
              disabled={!allFieldsPopulated}
            >
              Save your changes
            </Button>
            <Typography component="h5" variant="body2" color="grey.main">
              After saving your changes, your item will be reviewed and
              reposted!
            </Typography>
            <Button sx={{ mt: 2, mb: 2, ml: -1 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
