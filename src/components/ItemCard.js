import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import ItemShape from "./ItemShape";

export default function ItemCard({
  item,
  handleClick,
  page,
  sold,
  complete,
  isReviewer,
}) {
  const markAsSold = (status) => {
    const getData = async () => {
      const newItem = { ...item };
      if (status === "sold") {
        newItem.isAvailable = false;
      } else if (status === "relist") {
        newItem.isAvailable = true;
      }

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

  const postItem = () => {
    const getData = async () => {
      const newItem = { ...item };
      newItem.adminApproved = true;
      newItem.isAvailable = Boolean(newItem.isAvailable);
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
    console.log("Post!");
  };

  const removeRelistItem = (status) => {
    const getData = async () => {
      const newItem = { ...item };

      if (status === "remove") {
        newItem.adminRemoved = true;
        newItem.isAvailable = Boolean(newItem.isAvailable);
      }
      if (status === "relist") {
        newItem.adminRemoved = false;
        newItem.isAvailable = Boolean(true);
      }
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

  const remove_button = () => {
    if ((isReviewer && !sold && !item.adminRemoved) || page === "approve") {
      return (
        <Button
          color="warning"
          size="large"
          onClick={() => {
            removeRelistItem("remove");
          }}
        >
          Remove
        </Button>
      );
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          pt: "5.25%",
        }}
        image={`https://res.cloudinary.com/middmarkit/image/upload/${item.images}`}
        alt="random"
      />
      <CardContent sx={{}}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          align="center"
          noWrap
        >
          {item.name}
        </Typography>
        <Typography align="center">${item.price}</Typography>
        <Typography align="center" noWrap>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        {
          <Button
            size="medium"
            variant="outlined"
            onClick={() => {
              handleClick("View item", item.id);
            }}
          >
            View item
          </Button>
        }
        {page === "user" && !sold && !item.adminRemoved && (
          <Button
            size="medium"
            color="warning"
            onClick={() => {
              markAsSold("sold");
            }}
          >
            Mark as sold
          </Button>
        )}
        {remove_button()}

        {sold && (
          <Button
            color="warning"
            size="medium"
            onClick={() => markAsSold("relist")}
          >
            Relist
          </Button>
        )}
        {/* for admins to relist the item after removing it*/}
        {page === "remove" && (
          <Button
            color="warning"
            size="medium"
            onClick={() => removeRelistItem("relist")}
          >
            Relist
          </Button>
        )}

        {page === "approve" && (
          <Button
            color="success"
            size="medium"
            variant="outlined"
            onClick={() => postItem()}
          >
            Post
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
  sold: PropTypes.string,
  complete: PropTypes.func,
};
