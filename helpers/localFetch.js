import fs from "fs/promises";
import path from "path";
export function buildFilePath() {
  return path.join(process.cwd(), "data", "email.json");
}
export function buildCommentFilePath() {
  return path.join(process.cwd(), "data", "commentData.json");
}

export function extractFile(filePath) {
  const fileData = fs.readFileSync(filePath);
  let data = JSON.parse(fileData);
  return data;
}
