require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const contactsApi = process.env["CONTACTS_API"];
const orgId = process.env["ORG_ID"];
const token = process.env["TOKEN"];

const PORT = 5000;

app.use(cors());
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.get("/", (req, res) => res.send("API Running"));

app.get("/contacts", async (req, res) => {
  try {
    let config = {
      headers: {
        Authorization: token,
      },
      params: {
        organization_id: orgId,
      },
    };
    const response = await axios.get(contactsApi, config);
    return res.json(response.data.contacts);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Internal server error");
  }
});
