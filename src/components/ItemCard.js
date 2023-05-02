import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";

import CardContent from "@mui/material/CardContent";

const ItemCard = ({ item, handleClick }) => {
  const cloud_name = "middmarkit";
  const public_id = item.images;
  return (
    <ButtonBase onClick={() => handleClick("View item", item.id)}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          m: "10px",
          pt: "10px",
        }}
      >
        <CardMedia
          component="img"
          sx={{ p: "10px" }}
          image={`https://res.cloudinary.com/${cloud_name}/image/upload/${public_id}`}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography>${item.price}</Typography>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions style={{ display: "none" }}>
          <Button> </Button>
        </CardActions>
      </Card>
    </ButtonBase>
  );
};

export default ItemCard;
