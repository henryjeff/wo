import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import clientPromise from "lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Sign up most be a post request" });
  }

  //Getting email and password from body
  const { email, password } = req.body;

  const client = await clientPromise;
  const db = client.db("woDatabase");

  //Check existing
  const checkExisting = await db.collection("users").findOne({ email: email });

  //Send error response if duplicate user is found
  if (checkExisting) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  //Hash password
  const status = await db.collection("users").insertOne({
    email,
    password: await hash(password, 12),
  });

  //Send success response
  res.status(201).json({ message: "User created", ...status });
};

export default handler;
