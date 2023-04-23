import nc from "next-connect";
import Item from "../../../../models/Item";
import { onError } from "../../../lib/middleware";

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
  });

export default handler;
