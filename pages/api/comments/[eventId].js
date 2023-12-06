import { connectDatabase, insertDocument } from "../../../helpers/db-util";
import { getAllDocument } from "../../../helpers/db-util";
async function Comment(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!!" });
    return;
  }
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      return res
        .status(201)
        .send({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!!" });
    }

    // const filePath =  path.join(process.cwd(), "data", "commentData.json");
    // const fileData = fs.readFileSync(filePath);
    // let data = JSON.parse(fileData);
    // data.push(newComment);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // console.log(newComment);
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocument(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      return res.status(200).json({ comment: documents });
    } catch (error) {
      res.status(500).json({ message: "Fetching data failed!!" });
    }
  }
  client.close();
}
export default Comment;
