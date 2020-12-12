
const faker = require("faker");
const { Financial } = require("../src/models/financial");

factory.define("Financial",Financial,{
  client_id:faker.random({min:1,max:10}),
  motive:faker.lorem,
  amount:faker.random({min:1,max:10}),
  date:faker.date
})

module.exports = factory;