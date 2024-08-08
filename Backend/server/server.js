const express = require("express");
const path = require("path");
const cors = require("cors");

const { createServer } = require("http");

const corsConfig = {
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  origin: "*",
  credentials: false,
};

const fs = require("fs");



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      route: "/api",
    };
    this.server = createServer(this.app);
    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsConfig));
    this.app.use(express.static("./public"));
    this.app.use(express.json({ limit: "200mb" }));
    this.app.use(express.urlencoded({ limit: "200mb", extended: false }));
  }

  routes() {
    const routes = require("../routes/index");
    routes.map((value) => {
      this.app.use(this.paths.route, require(value));
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server listenen on port", this.port);
    });
  }
}

module.exports = Server;