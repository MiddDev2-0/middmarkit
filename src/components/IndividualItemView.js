import PropTypes from "prop-types";
import ItemShape from "./ItemShape";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

export default function IndividualItemView({ item }) {
  const cloud_name = "middmarkit";
  const public_id = item.images;
  const router = useRouter();

  return (
    <Grid container spacing={2} justifyContent="center" justify="center">
      <Grid item xs={12} sm="auto" alignItems="center">
        <Card sx={{ maxWidth: "400px" }}>
          <CardMedia
            component="img"
            style={{ height: "400" }}
            image={`https://res.cloudinary.com/${cloud_name}/image/upload/${public_id}`}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm>
        <Container>
          <Typography variant="h4" align="left">
            {item.name}
          </Typography>
          <Typography variant="h5" align="left">
            ${item.price}
          </Typography>
          <Typography variant="subtitle1" align="left">
            {item.description}
          </Typography>
          <Button
            size="medium"
            variant="outlined"
            onClick={() => {
              router.push(`/items/${item.id}/edit`);
            }}
          >
            Edit item
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
}

IndividualItemView.propTypes = {
  item: ItemShape,
  handleClick: PropTypes.func,
};
