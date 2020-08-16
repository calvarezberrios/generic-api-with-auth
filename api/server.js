const express = require("express").Router();
const helmet = require("helmet");
const cors = require("helmet");

const authRouter = require("../auth/authRouter.js");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);

server.get("/", (req, res) => res.json({api: "up"}));

server.use((req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = server;