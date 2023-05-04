/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

const user_data = require("../../data/UserData.json");
const item_data = require("../../data/ItemData.json");

const createItem = (knex, item, userEmail) => {
  return knex("User")
    .where("email", userEmail)
    .first()
    .then((userInfo) => {
      console.log(userInfo);
      return knex("Item").insert({
        name: item.name,
        description: item.description,
        sellerId: userInfo["id"],
        price: item.price,
        datePosted: item.datePosted,
        isAvailable: item.isAvailable,
        images: item.images,
      });
    });
};

exports.seed = function (knex) {
  return knex("Item")
    .del()
    .then(() => {
      return knex("User").del();
    })
    .then(() => {
      return knex("User").insert(user_data);
    })
    .then(() => {
      const itemPromises = [];
      item_data.forEach((item) => {
        const userEmail = item.sellerEmail;
        itemPromises.push(createItem(knex, item, userEmail));
        console.log(item);
      });
      return Promise.all(itemPromises);
    });
};
