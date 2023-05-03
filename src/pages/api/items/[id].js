import nc from "next-connect";
import Item from "../../../../models/Item";
import { onError } from "../../../lib/middleware";
import User from "../../../../models/User";

const handler = nc({ onError })
  .get(async (req, res) => {
    const item = await Item.query().findById(req.query.id).throwIfNotFound();
    res.status(200).json(item);
  })

  .put(async (req, res) => {
    const { id, ...updatedItem } = req.body;
    if (id !== parseInt(req.query.id, 10)) {
      res.status(400).end("URL and object does not match");
      return;
    }
    const item = await Item.query()
      .updateAndFetchById(id, updatedItem)
      .throwIfNotFound();
    res.status(200).json(item);
  })
  .delete(async (req, res) => {
    const item = await User.query().deleteById(req.query.id).throwIfNotFound();
    if (item) {
      console.log(item);
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(400).end("item not found");
    }
  });

export default handler;
