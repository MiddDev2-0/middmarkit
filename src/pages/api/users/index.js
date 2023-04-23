import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import User from "../../../../models/User";

const handler = nc({ onError })
  .get(async (req, res) => {
    const query = User.query();
    const users = await query;
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    const { id, ...newUser } = req.body;
    const user = await User.query().insertAndFetch(newUser).throwIfNotFound();
    res.status(200).json(user);
  });

export default handler;
