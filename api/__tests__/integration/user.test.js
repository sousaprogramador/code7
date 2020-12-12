const request = require("supertest");
const app = require("../../src/app");

const { MongoClient } = require('mongodb');
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

describe('users',()=>{

  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    db = await connection.db(process.env.MONGO_DB);
  });

  beforeEach(async () => {
    await db.collection('user').deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should recive users date and save in database', async ()=>{
    const response = await request(app)
      .post("/user")
      .send({
        name:"Mateus Sousa",
        email:"sousa.programador@gmail.com",
        password:"secretf5"
      });
    expect(response.status).toBe(201);
  })

  it('should list financial register in database', async ()=>{
    const response = await request(app)
    .get("/user")
    expect(response.status).toBe(200);
  })

  it('should show register financial register in database', async ()=>{
    const financial = db.collection('user');

    const mockFinancial = {
      _id:"5fd4e226b986772f58af24ec",
      name:"Mateus Sousa",
      email:"sousa.programador@gmail.com",
      password:"secretf5"
    };

    await financial.insertOne(mockFinancial);

    const response = await request(app)
    .get("/user/5fd4e226b986772f58af24ec")
    expect(response.status).toBe(200);
  })

  
})
