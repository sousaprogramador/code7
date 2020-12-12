const { MongoClient } = require('mongodb');
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

describe('financial',()=>{
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    db = await connection.db(process.env.MONGO_DB);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    const financial = db.collection('financial');

    const mockFinancial = {
      _id:"5fd4df710af72327674a6039",
      client_id:1,
      motive:"asasasas",
      amount:10,
      date:"2020-12-12T12:39:26.564Z"
    };
   
    await financial.insertOne(mockFinancial);
    const inserted = await financial.findOne({_id: "5fd4df710af72327674a6039"});
    expect(inserted).toEqual(mockFinancial);
  });

  
})
