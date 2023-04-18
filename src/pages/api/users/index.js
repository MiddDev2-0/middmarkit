import { knex } from "../../../../knex/knex";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET": {
      const knexQuery = knex("User");
      const users = await knexQuery;
      res.status(200).json(users);
      break;
    }
    case "POST": {
      const { id, ...user } = req.body;
      const [insertedId] = await knex("User").insert(user);
      res.status(200).json({ ...user, id: insertedId });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
