import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Container } from "@mui/material";

export default function IndividualItemView({ item }) {
  const cloud_name = "middmarkit";
  const public_id = item.images;
  return (
    <Stack spacing={2}>
      <Card sx={{ maxWidth: "400px" }}>
        <CardMedia
          component="img"
          style={{ height: "400" }}
          image={`https://res.cloudinary.com/${cloud_name}/image/upload/${public_id}`}
        />
      </Card>
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
      </Container>
    </Stack>
  );
}
