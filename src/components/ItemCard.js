import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import ItemShape from "./ItemShape";

export default function ItemCard({ item, handleClick, page, sold, complete }) {
  const markAsSold = () => {
    const getData = async () => {
      const newItem = { ...item };
      newItem.isAvailable = false;
      const response = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(newItem),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();
      complete(data);
    };
    getData();
  };

  const bottomtext = () => {
    if (!sold) {
      return (
        <CardContent sx={{}}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {item.name}
          </Typography>
          <Typography align="center">${item.price}</Typography>
          <Typography align="center" noWrap sx={{ width: "100%" }}>
            {item.description}
          </Typography>
        </CardContent>
      );
    } else {
      return (
        <CardContent sx={{}}>
          <Typography gutterBottom variant="h3" component="h2" align="center">
            SOLD
          </Typography>
        </CardContent>
      );
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: sold ? "#CECFD0" : "#FFFFFF",
        height: "100%",
        "&:hover": { border: "5px solid #CECFD0" },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: "5.25%",
        }}
        image={`https://res.cloudinary.com/middmarkit/image/upload/${item.images}`}
        alt="random"
      />
      {bottomtext()}
      <CardActions>
        {!sold && (
          <Button
            size="small"
            onClick={() => {
              handleClick("View item", item.id);
            }}
          >
            View item
          </Button>
        )}
        {page === "user" && !sold && (
          <Button
            size="small"
            onClick={() => {
              markAsSold();
            }}
          >
            Mark as sold
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

ItemCard.propTypes = {
  item: ItemShape,
  handleClick: PropTypes.func.isRequired,
  page: PropTypes.string,
  sold: PropTypes.bool,
  complete: PropTypes.func,
};
