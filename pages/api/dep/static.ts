import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const file = fs
    .readFileSync(path.join(process.cwd(), "/pages/api/dep/workouts.json"))
    .toString();
  res.status(200).json(JSON.parse(file));
};

export default handler;
