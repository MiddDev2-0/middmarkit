import PropTypes from "prop-types";
import ItemShape from "./ItemShape";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function IndividualItemView({ item }) {
  const { data: session } = useSession();
  const public_id = item.images;
  const router = useRouter();
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2} justifyContent="center" justify="center">
        <Grid item xs={12} sm="auto" alignItems="center">
          <Card sx={{ maxWidth: "400px" }}>
            <CardMedia
              component="img"
              style={{ height: "400" }}
              image={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/${public_id}`}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ pb: 3, pr: 3 }}>
          <Container disableGutters sx={{ ml: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h5"
                align="left"
                style={{
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="h5"
                align="right"
                style={{
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                ${item.price}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              align="left"
              style={{ wordWrap: "break-word" }}
            >
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
      </Grid>
    </Container>
  );
}

IndividualItemView.propTypes = {
  item: ItemShape,
  handleClick: PropTypes.func,
};
