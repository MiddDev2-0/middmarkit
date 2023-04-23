import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import User from "../../../../models/User";

const handler = nc({ onError }).get(async (req, res) => {
  const user = await User.query()
    .findById(req.query.id)
    .withGraphFetched("items")
    .throwIfNotFound();
  res.status(200).json(user);
});

export default handler;
