const request = require("supertest");
const app = require("../../src/app");

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

  it('should recive financial date and save in database', async ()=>{
    const response = await request(app)
      .post("/financial")
      .send({
        client_id: 1,
        motive: "teste de integracao",
        amount:10,
        date:"2020-12-12T12:39:26.564Z"
      });
    expect(response.status).toBe(201);
  })

  it('should recive financial date and return error 500', async ()=>{
    const response = await request(app)
      .post("/financial")
      .send({
        motive: "teste de integracao",
        amount:10,
        date:"2020-12-12T12:39:26.564Z"
      });
    expect(response.status).toBe(500);
  })

  it('should list financial register in database', async ()=>{
    const response = await request(app)
    .get("/financial")
    expect(response.status).toBe(200);
  })

  it('should show register financial register in database', async ()=>{
    const financial = db.collection('financial');

    const mockFinancial = {
      _id:"5fd4e226b986772f58af24ec",
      client_id:1,
      motive:"teste de integracao",
      amount:10,
      date:"2020-12-12T12:39:26.564Z"
    };

    await financial.insertOne(mockFinancial);

    const response = await request(app)
    .get("/financial/5fd4e226b986772f58af24ec")
    expect(response.status).toBe(200);
  })

  
})
