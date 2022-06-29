import type { NextApiRequest, NextApiResponse } from "next";
import fileSys, { promises as fs } from "fs";
import path from "path";
import formidable, { File } from "formidable";
import yauzl from "yauzl";
import mkdirp from "mkdirp";
import { z } from "zod";
import {
  parseWorkout,
  convertFileToWorkoutString,
} from "../../util/workoutParsing";
import moment from "moment";

const dateSchema = z.object({
  year: z.number().min(0).max(99),
  month: z.number().max(12).min(1),
  day: z.number().min(1).max(31),
});

/* Don't miss that! */
export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = { status: "ok", message: "Files were uploaded successfully" };

  // go into the directory and find all files with .json extension
  const targetPath = path.join(process.cwd(), `/uploads/`);

  const files = await fs.readdir(`${targetPath}/Takeout/Keep`);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));
  // console.log(files);
  const workouts: ParsedWorkout[] = [];

  for (const fileName of jsonFiles) {
    const fn = fileName.split(".json")[0].split("_");

    if (fn.length == 2) {
      console.log("problematic?? ", fn);
    }

    if (fn.length !== 3) {
      continue;
    }
    // console.log("processing ", fn);

    const tempDate = {
      day: parseInt(fn[1]),
      month: parseInt(fn[0]),
      year: parseInt(fn[2]),
    };

    if (!dateSchema.safeParse(tempDate).success) continue;

    // console.log("processing ", fn);

    // // convert temp date to a real date
    const date = new Date(
      Number(`20${tempDate.year}`),
      tempDate.month - 1,
      tempDate.day
    );

    const workoutString = convertFileToWorkoutString(
      "/uploads/Takeout/Keep/" + fileName
    );
    // console.log("ON WORKOUT STRING", moment(date).format("YYYY-MM-DD"));
    // console.log(workoutString);

    const workout = parseWorkout(workoutString);

    // const Workout: Workout = analyzeWorkout(
    //   date.toISOString(),
    //   workout
    // );
    workouts.push({ date: date.toISOString(), lifts: workout });
  }

  res.status(status).json({ ...resultBody, workouts: workouts });
};

export default handler;
