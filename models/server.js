const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/auth", require("../routes/auth"));
    this.app.use("/api/users", require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Running in ", this.port);
    });
  }
}

module.exports = Server;
