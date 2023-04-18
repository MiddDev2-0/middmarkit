import { knex } from "../../../../knex/knex";

export default async function handler(req, res) {
  const { method, query } = req;
  switch (method) {
    case "GET": {
      const item = await knex("Item").where({ id: query.id }).first();
      res.status(200).json(item);
      break;
    }
    case "PUT": {
      if (req.body.id !== parseInt(query.id, 10)) {
        res.status(400).end(`URL and object does not match`);
        break;
      }
      const updates = await knex("Item")
        .where({ id: query.id })
        .update(req.body);
      if (updates === 1) {
        res.status(200).json(req.body);
      } else {
        res.status(400).end(`Unable to update row`);
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
