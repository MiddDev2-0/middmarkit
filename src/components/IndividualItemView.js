import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Container } from "@mui/material";
import Image from "next/image";

export default function IndividualItemView({ item }) {
  return (
    <Stack spacing={2} direction="row" sx={{ paddingTop: 10 }}>
      <Card sx={{ maxWidth: "50%", maxHeight: 600 }}>
        <CardMedia
          component="img"
          style={{ height: "400" }}
          image={item.images}
        />
      </Card>
      <Container sx={{ maxWidth: "50%" }}>
        <Typography variant="h3" align="left">
          {item.name}
        </Typography>
        <Typography variant="h5" align="left">
          ${item.price}
        </Typography>
        <Typography variant="subtitle1" align="left">
          {item.description}
        </Typography>
      </Container>
      {<Image src="/Images/0.jpg" height="100" width="100" alt="table" />}
    </Stack>
  );
}
