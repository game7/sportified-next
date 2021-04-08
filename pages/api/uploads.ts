import { NextApiHandler } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getSession } from "next-auth/client";

const handler: NextApiHandler = async (req, res) => {
  console.log(req);
  const session = await getSession(req);
  console.log(session);
  const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  // throw new Error("oops!");
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    ContentType: req.body.contentType,
    ACL: "public-read",
    Key: "foobar/" + req.body.filename,
  });
  const url = await getSignedUrl(client, command, {});
  console.log(url);
  res.status(200).json({ url });
};

export default handler;
