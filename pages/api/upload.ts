import type { NextApiRequest, NextApiResponse } from "next";
// import fileSys, { promises as fs } from "fs";
// import path from "path";
// import formidable, { File } from "formidable";
// import yauzl from "yauzl";
// import mkdirp from "mkdirp";
// import { z } from "zod";
// import {
//   parseWorkout,
//   convertFileToWorkoutString,
// } from "../../util/workoutParsing";
// // import { analyzeWorkout } from "../../util/analysis";

// const dateSchema = z.object({
//   year: z.number().min(0).max(99),
//   month: z.number().max(12).min(1),
//   day: z.number().min(1).max(31),
// });

// /* Don't miss that! */
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const unzip = (zipPath: string, unzipToDir: string) => {
//   return new Promise<void>((resolve, reject) => {
//     try {
//       // Create folder if not exists
//       mkdirp.sync(unzipToDir);

//       // Same as example we open the zip.
//       yauzl.open(zipPath, { lazyEntries: true }, (err, zipFile) => {
//         if (err) {
//           zipFile.close();
//           reject(err);
//           return;
//         }
//         zipFile.readEntry();
//         zipFile.on("entry", (entry) => {
//           try {
//             // Directories
//             if (/\/$/.test(entry.fileName)) {
//               // Create the directory then read the next entry.
//               mkdirp.sync(path.join(unzipToDir, entry.fileName));
//               zipFile.readEntry();
//             }
//             // Files
//             else {
//               // Write the file to disk.
//               zipFile.openReadStream(entry, (readErr, readStream) => {
//                 if (readErr) {
//                   zipFile.close();
//                   reject(readErr);
//                   return;
//                 }

//                 const file = fileSys.createWriteStream(
//                   path.join(unzipToDir, entry.fileName)
//                 );

//                 readStream.pipe(file);

//                 readStream.on("finish", () => {
//                   zipFile.readEntry();
//                 });
//               });
//             }
//           } catch (e) {
//             zipFile.close();
//             reject(e);
//           }
//         });
//         zipFile.on("end", (err) => {
//           resolve();
//         });
//         zipFile.on("error", (err) => {
//           zipFile.close();
//           reject(err);
//         });
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // let status = 200,
  //     resultBody = { status: "ok", message: "Files were uploaded successfully" };
  //   /* Get files using formidable */
  //   const files = await new Promise<ProcessedFiles | undefined>(
  //     (resolve, reject) => {
  //       const form = new formidable.IncomingForm();
  //       const files: ProcessedFiles = [];
  //       form.on("file", function (field, file) {
  //         files.push([field, file]);
  //       });
  //       form.on("end", () => resolve(files));
  //       form.on("error", (err) => reject(err));
  //       form.parse(req, () => {
  //         //
  //       });
  //     }
  //   ).catch((e) => {
  //     console.log(e);
  //     status = 500;
  //     resultBody = {
  //       status: "fail",
  //       message: "Upload error",
  //     };
  //   });
  //   if (files?.length) {
  //     /* Create directory for uploads */
  //     const targetPath = path.join(process.cwd(), `/uploads/`);
  //     try {
  //       await fs.access(targetPath);
  //     } catch (e) {
  //       await fs.mkdir(targetPath);
  //     }
  //     /* Move uploaded files to directory */
  //     for (const file of files) {
  //       const tempPath = file[1].filepath;
  //       const newFilePath = targetPath + file[1].originalFilename;
  //       await fs.rename(tempPath, newFilePath);
  //       await unzip(newFilePath, targetPath);
  //       // go into the directory and find all files with .json extension
  //       const files = await fs.readdir(`${targetPath}/Takeout/Keep`);
  //       const jsonFiles = files.filter((file) => file.endsWith(".json"));
  //       // console.log(files);
  //       const workouts: Workout[] = [];
  //       for (const fileName of jsonFiles) {
  //         const fn = fileName.split(".json")[0].split("_");
  //         if (fn.length !== 3) {
  //           continue;
  //         }
  //         const tempDate = {
  //           day: parseInt(fn[1]),
  //           month: parseInt(fn[0]),
  //           year: parseInt(fn[2]),
  //         };
  //         if (!dateSchema.safeParse(tempDate).success) continue;
  //         // convert temp date to a real date
  //         const date = new Date(
  //           Number(`20${tempDate.year}`),
  //           tempDate.month - 1,
  //           tempDate.day
  //         );
  //         const workoutString = convertFileToWorkoutString(
  //           "/uploads/Takeout/Keep/" + fileName
  //         );
  //         const workout = parseWorkout(workoutString);
  //         const metaWorkout: MetaWorkout = analyzeWorkout(
  //           date.toISOString(),
  //           workout
  //         );
  //         workouts.push(metaWorkout);
  //       }
  //       res.status(status).json({ ...resultBody, workouts });
  //     }
  //   }
  res.status(200);
};

export default handler;
