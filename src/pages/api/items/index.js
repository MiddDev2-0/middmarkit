import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import Item from "../../../../models/Item";

const handler = nc({ onError })
  .get(async (req, res) => {
    const query = Item.query();
    const items = await query;
    res.status(200).json(items);
  })
  .post(async (req, res) => {
    const { id, ...newItem } = req.body;
    console.log("newItem made it to the API: ", newItem);
    const item = await Item.query().insertAndFetch(newItem).throwIfNotFound();
    console.log("item was inserted into DB", item);
    res.status(200).json(item);
  });

export default handler;
