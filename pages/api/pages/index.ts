import { NextApiHandler } from "next";
import db from "../../../src/db";

const handlePost: NextApiHandler = async (req, res) => {
  const page = await db.page.create({
    data: { tenantId: 1, title: "New Page" },
  });
  res.status(201).json(page);
};

const handlePatch: NextApiHandler = async (req, res) => {
  const { query } = req;
  console.log({ query });
  res.status(200).json({ query });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return handlePost(req, res);
  }
  if (req.method == "PATCH") {
    return handlePatch(req, res);
  }
  res.status(405).json("Method Not Allowed");
};

export default handler;
