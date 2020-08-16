const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

describe("Users Router", () => {
    it("creates test user", async () => {
        const res = await request(server).post("/api/auth/register")
                            .send({
                                    fname: "Test",
                                    lname: "Tester",
                                    username: "tester",
                                    password: "1234"
                            });
    });

    describe("GET /api/users", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).get("/api/users");
        });

        test("should get status 200 OK", () => {
            expect(res.status).toBe(200);
        });

        test("should return an array", () => {
            expect(res.body).toBeInstanceOf(Array);
        });

    });

    describe("GET /api/users/:id", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).get("/api/users/1");
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(200);
        });

        test("should return user object with id 1", () => {
            expect(res.body.id).toEqual(1);
        });

    });

    describe("PUT /api/users/:id", () => {
        let res = {};
        const changes = {
            id: 1,
            fname: "Test",
            lname: "Tester",
            username: "tester",
            password: "1234"
        }
        beforeAll(async () => {
            res = await request(server).put("/api/users/1")
                            .send(changes);
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(200);
        });

        test("should return updated user object", () => {
            expect(res.body).toEqual(changes);
        });
    });

    describe("DELETE /api/users/:id", () => {
        let res = {};
        beforeAll(async () => {
            res = (await request(server).delete("/api/users/1"));
        });

        test("should return status 204 No Content", () => {
            expect(res.status).toBe(204);
        });
    });

    it("cleans the users table", async () => {
        await db("users").truncate();
    })
});