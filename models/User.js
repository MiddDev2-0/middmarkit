/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Item from "./Item";

export default class User extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "User";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["googleId"],
      // , "firstName", "lastName", "email"],

      properties: {
        id: { type: "integer" },
        googleId: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        reviewerStatus: { type: "boolean", default: false },
      },
    };
  }

  static relationMappings = () => ({
    items: {
      relation: Model.HasManyRelation,
      modelClass: Item,
      join: {
        to: "Item.sellerId",
        from: "User.id",
      },
    },
  });

  //Override this method to exclude googleId
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.googleId;
    return json;
  }
}
