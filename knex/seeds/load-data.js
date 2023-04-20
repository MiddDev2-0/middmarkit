/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

const user_data = require("../../data/UserData.json");

exports.seed = function (knex) {
  return knex("Item")
    .del()
    .then(() => {
      return knex("User").del();
    })
    .then(() => {
      return user_data.forEach(async (user) => {
        const newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          reviewerStatus: user.reviewerStatus,
        };
        const id = await knex("User").insert(newUser);
        console.log(newUser, id);
        user.items.forEach(async (item) => {
          await knex("Item").insert({ ...item, sellerId: id });
        });
      });
    });

  //     // // console.log(typeof user_data);
  //     // const usersArray = user_data.map((user) => ({
  //     //     firstName: user.firstName,
  //     //     lastName: user.lastName,
  //     //     email: user.email,
  //     //     reviewerStatus: user.reviewerStatus,
  //     //   })
  //     // );
  //     // return knex("User").insert(usersArray);
  //   }).catch(error => console.log(error));
  //   // .then(() => {
  //   //   const itemsArray = [];
  //   //   user_data.forEach((user) => {
  //   //     user.items.forEach((item) => {
  //   //       itemsArray.push(item);
  //   //     });
  //   //   });
  //   //   return knex("Item").insert(itemsArray);
  //   // });
};
