import fs from "fs";
import path from "path";
import { buildFilePath, extractFile } from "../../helpers/localFetch";
import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function helper(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).send({ message: "Invalid email" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!!" });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!!" });
      return;
    }

    // const filePath = path.join(process.cwd(), "data", "email.json");
    // const fileData = fs.readFileSync(filePath);
    // let data = JSON.parse(fileData);
    // const filePath = buildFilePath(email);
    // const data = extractFile(filePath);
    // data.push(newEmail);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: "Email added successfully" });
  }
}
export default helper;
