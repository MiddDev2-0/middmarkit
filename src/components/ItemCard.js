import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import ItemShape from "./ItemShape";

const API_VERSION = "v17.0";
const CLOUD_NAME = "middmarkit";

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
  const unApproveItem = () => {
    const getData = async () => {
      const newItem = { ...item };
      newItem.adminApproved = false;
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

    const formData = {
      image_url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${item.images}`,
      caption: `${item.name}\n${item.description}\nPrice: ${item.price}`,
      access_token: process.env.NEXT_PUBLIC_IG_ACCESS_TOKEN,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const container = `https://graph.facebook.com/v11.0/${process.env.NEXT_PUBLIC_IG_USER_ID}/media`;

    fetch(container, options)
      .then((response) => response.json())
      .then((data) => {
        const creationId = data.id;
        const formDataPublish = {
          creation_id: creationId,
          access_token: NEXT_PUBLIC_IG_ACCESS_TOKEN,
        };
        const optionsPublish = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataPublish),
        };
        const sendinstagram = `https://graph.facebook.com/${API_VERSION}/${process.env.NEXT_PUBLIC_IG_USER_ID}/media_publish`;

        return fetch(sendinstagram, optionsPublish);
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
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
        newItem.adminApproved = true;
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
    if ((isReviewer && !sold && !item.adminRemoved) || page === "unapproved") {
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
              handleClick("View item", item);
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

        {/* for admins to relist the item after removing it, this also automatically approves it*/}
        {page === "remove" && (
          <Button
            color="warning"
            size="medium"
            onClick={() => removeRelistItem("relist")}
          >
            Relist
          </Button>
        )}

        {page === "unapproved" && (
          <Button
            color="success"
            size="medium"
            variant="outlined"
            onClick={() => postItem()}
          >
            Post
          </Button>
        )}

        {
          <Button
            color="success"
            size="medium"
            variant="outlined"
            onClick={() => unApproveItem()}
          >
            Unapprove
          </Button>
        }
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
