import { useState } from "react";
import { useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useSession } from "next-auth/react";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function SellerForm({}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageId, setImageId] = useState(undefined);
  const [price, setPrice] = useState("");
  const [allFieldsPopulated, setAllFieldsPopulated] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [seller, setSeller] = useState();

  const [open, setOpen] = React.useState(false);
  const [openPop, setOpenPop] = React.useState(false);

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

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleOpenBackdrop = () => {
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpenPop(true);
  };

  useEffect(() => {
    setAllFieldsPopulated(name !== "" && price !== "" && imageId !== undefined);
  }, [name, description, price, imageId]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      handleOpenBackdrop();
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET
      );
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUD_API_KEY);

      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/auto/upload`,
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
    }
  };

  const handlePost = () => {
    if (!description) {
      setDescription(" ");
    }
    const newItem = {
      name: name,
      description: description,
      price: Math.round(+price),
      datePosted: new Date().toISOString(),
      sellerId: seller.id,
      isAvailable: true,
      images: imageId,
      adminRemoved: false,
    };

    fetch("/api/items", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
    handleClickOpen();
  };

  const handleCancel = () => {
    router.push(`/`);
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      const { target } = event;
      const uploadButton = document.getElementById("image-upload");
      if (uploadButton && !uploadButton.contains(target)) {
        handleCloseBackdrop();
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            color="secondary"
            sx={{ mb: 2 }}
          >
            Sell your stuff!
          </Typography>

          <div>
            <Backdrop sx={{ color: "#fff" }} open={open}>
              <CircularProgress />
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
                    maxLength: 50,
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
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="image-upload">
                  <input
                    id="image-upload"
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                  />
                  <Button
                    color="primary"
                    variant={imageId ? "outlined" : "contained"}
                    component="span"
                    size="medium"
                    startIcon={imageId ? <EditIcon /> : <CloudUploadIcon />}
                  >
                    {imageId ? "Change Image" : "Upload Image"}
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlePost}
              disabled={!allFieldsPopulated}
            >
              Submit your post!
            </Button>
            <Typography component="h5" variant="body2" color="grey.main">
              Your email will be accessible to anyone viewing the post. Please
              be cautious when sharing personal information.
            </Typography>
            <Dialog
              open={openPop}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                sx={{ backgroundColor: green[500], color: "#fff" }}
              >
                <CheckCircleIcon
                  fontSize="large"
                  sx={{ verticalAlign: "middle", mr: 2 }}
                />
                {"Successfully submitted!"}
              </DialogTitle>
              <DialogContent sx={{ mt: 2 }}>
                <DialogContentText id="alert-dialog-description">
                  {seller
                    ? `Congratulations, ${seller.firstName}! We will review your submission
                    then post it.`
                    : `Loading...`}
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "right",
                  // A lighter green color for the actions section
                }}
              >
                <Button
                  onClick={() => router.push(`/users/${session.id}`)}
                  size="large"
                  sx={{ color: green[500], flex: 1 }} // Use green color for the button text
                >
                  See Post
                </Button>
                <Button
                  onClick={() => router.reload()}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: green[500],
                    flex: 2,
                  }} // Use green color for the button background
                >
                  Make Another Post
                </Button>
              </DialogActions>
            </Dialog>
            <Button sx={{ mt: 2, mb: 2 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
