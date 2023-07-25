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
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useRouter } from "next/router";
import { green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
          console.log(data.firstName);
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
    setAllFieldsPopulated(
      name !== "" && description !== "" && price !== "" && imageId !== undefined
    );
  }, [name, description, price, imageId]);

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
  };

  const handlePost = () => {
    const newItem = {
      name: name,
      description: description,
      price: Math.round(+price),
      sellerId: seller.id,
      datePosted: new Date().toISOString(),
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
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    handleClickOpen();
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
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" color="secondary">
            Sell your stuff!
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
                  InputProps={{
                    disableUnderline: true,
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
              type="button"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlePost}
              disabled={!allFieldsPopulated}
            >
              Post your item!
            </Button>
            <Typography component="h5" variant="body2" color="grey.main">
              Your email will be accessible to anyone viewing the item. Please
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
                    ? `Congratulations, ${seller.firstName}! Your item will be reviewed and
                  then posted to middmarkit.com and @middmarkit on Insgagram!`
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
                  See Item
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
                  Sell More Items
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
