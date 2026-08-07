const express = require("express");
const router = express.Router();
const driver = require("../config/db");

router.get("/db", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)
      RETURN u.email AS email,
             u.name AS name
    `);

    res.json(
      result.records.map((r) => ({
        email: r.get("email"),
        name: r.get("name"),
      }))
    );
  } catch (err) {
    res.status(500).json(err.message);
  } finally {
    await session.close();
  }
});

module.exports = router;