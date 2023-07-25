import PropTypes from "prop-types";
import ItemShape from "./ItemShape";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Box, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function IndividualItemView({ item }) {
  const { data: session } = useSession();
  const public_id = item.images;
  const router = useRouter();

  // Add this line to get the current breakpoint
  const isScreenLarge = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {isScreenLarge ? (
        <>
          <Grid item xs={12} sm={6}>
            <Card sx={{ pr: 0 }}>
              <CardMedia
                component="img"
                image={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/${public_id}`}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  align="left"
                  style={{ fontWeight: 300 }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="h5"
                  align="right"
                  style={{ fontWeight: 400 }}
                >
                  ${item.price}
                </Typography>
              </Box>
              <Typography variant="subtitle1" align="left">
                {item.description}
              </Typography>
              {session && item && session.user.id === item.sellerId && (
                <Button
                  size="medium"
                  sx={{ my: 2 }}
                  variant="outlined"
                  onClick={() => {
                    router.push(`/items/${item.id}/edit`);
                  }}
                >
                  Edit item
                </Button>
              )}
            </Container>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm="auto" alignItems="center">
            <Card sx={{ maxWidth: "400px" }}>
              <CardMedia
                component="img"
                style={{ height: "400px" }}
                image={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/${public_id}`}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sx={{ pb: 3, pr: 3 }}>
            <Container sx={{ ml: 1 }} disableGutters>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  align="left"
                  style={{ fontWeight: 300 }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="h5"
                  align="right"
                  style={{ fontWeight: 300 }}
                >
                  ${item.price}
                </Typography>
              </Box>
              <Typography variant="subtitle1" align="left">
                {item.description}
              </Typography>
              {session && item && session.user.id === item.sellerId && (
                <Button
                  size="medium"
                  sx={{ my: 2 }}
                  variant="outlined"
                  onClick={() => {
                    router.push(`/items/${item.id}/edit`);
                  }}
                >
                  Edit item
                </Button>
              )}
            </Container>
          </Grid>
        </>
      )}
    </Grid>
  );
}

IndividualItemView.propTypes = {
  item: ItemShape,
  handleClick: PropTypes.func,
};
