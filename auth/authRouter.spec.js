const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

const testUser = {
    fname: "Test",
    lname: "Tester",
    username: "tester",
    password: "1234"
};

describe("Auth Router", () => {
    describe("POST /api/auth/register", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).post("/api/auth/register")
                            .send(testUser);
        });

        test("should return status 201 Created", () => {
            expect(res.status).toBe(201);
        });

        test("should return created user object", () => {
            expect(res.body).toEqual({...testUser, id: 1});
        });
    });

    describe("POST /api/auth/login", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).post("/api/auth/login")
                            .send({username: testUser.username, password: testUser.password});
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(200);
        });

        test("should return an object with a token property", () => {
            expect(res.body).toHaveProperty("token");
        });
    });
    
    it("cleans out the users table", async () => {
        await db("users").truncate();
    });
});