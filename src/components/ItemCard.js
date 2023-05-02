import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

export default function ItemCard({ item, handleClick }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image={item.images}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography>${item.price}</Typography>
        <Typography>{item.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            handleClick("View item", item.id);
          }}
        >
          View item
        </Button>
      </CardActions>
    </Card>
  );
}
