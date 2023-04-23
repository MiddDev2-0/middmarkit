/* eslint-disable camelcase */
// import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Item extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Item";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "description"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "integer" },
        sellerId: { type: "integer" },
        datePosted: { type: "string" },
        isAvailable: { type: "boolean" },
        images: { type: "string" },
      },
    };
  }
}
