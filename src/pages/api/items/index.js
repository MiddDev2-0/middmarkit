import { knex } from "../../../../knex/knex";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET": {
      const knexQuery = knex("Item");
      const items = await knexQuery;
      res.status(200).json(items);
      break;
    }
    case "POST": {
      const { id, ...item } = req.body;
      const [insertedId] = await knex("Item").insert(item);
      res.status(200).json({ ...item, id: insertedId });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
