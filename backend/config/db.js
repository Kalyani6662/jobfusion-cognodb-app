const neo4j = require('neo4j-driver');
require('dotenv').config();

const URI = process.env.COGNO_URI || "bolt+s://db-a2594cc3.databases.cognodb.com";
const USER = process.env.COGNO_USER || "cognodb";
const PASSWORD = process.env.COGNO_PASSWORD || "a685516e8947b4eeee5af463581da9ae0";

console.log("Attempting connection to:", URI);
console.log("Using Username:", USER);

// bolt+s:// URL scheme unnapudu extra config rayakudadhu
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

const connectDB = async () => {
  try {
    const serverInfo = await driver.getServerInfo();
    console.log('CognoDB Connected Successfully! Server Version:', serverInfo.version);
  } catch (error) {
    console.error('CognoDB Connection Failed:', error);
  }
};

module.exports = { driver, connectDB };