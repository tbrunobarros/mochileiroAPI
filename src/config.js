const { join } = require("path");
const { config } = require("dotenv");

const env = process.env.NODE_ENV || "dev";

const configPath = join("./enviroments", `.env.${env}`);

config({
  path: configPath,
});

module.exports = {    
  PORT: process.env.PORT,
  IBGE_URL_BASE: process.env.IBGE_URL_BASE
};