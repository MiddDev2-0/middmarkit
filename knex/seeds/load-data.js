/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

const user_data = require("../../data/UserData.json");
// console.log(typeof user_data)

exports.seed = function (knex) {
  return knex("Item")
    .del()
    .then(() => {
      return knex("User").del();
    })
    .then(() => {
      const usersArray = [];
      // console.log(typeof user_data);
      user_data.forEach(
        (user) => console.log(user),
        usersArray.push({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          reviewerStatus: this.user.reviewerStatus,
        })
      );
      return knex("User").insert(usersArray);
    })
    .then(() => {
      const itemsArray = [];
      user_data.forEach((user) => {
        user.items.forEach((item) => {
          itemsArray.push(item);
        });
      });
      return knex("Item").insert(itemsArray);
    });
};
