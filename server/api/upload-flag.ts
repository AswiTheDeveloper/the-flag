import { readFileSync, writeFileSync, mkdirSync, renameSync } from "fs";
import { join } from "path";
import formidable from "formidable";

const imagesPath = join(process.cwd(), "images");

// Ensure the images directory exists
mkdirSync(imagesPath, { recursive: true });

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const form = formidable({ multiples: false });

    const body = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          console.error("Error parsing form:", err);
          reject(err);
        }
        console.log("Parsed files:", files); // Log the parsed files
        resolve({ fields, files });
      });
    });

    const { files } = body;

    // Ensure the file exists
    if (!files.flag) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required file",
      });
    }

    // Check the properties of the uploaded file
    console.log("Uploaded file info:", files.flag); // Log uploaded file info

    // Generate a unique filename for the uploaded flag
    const flagFileName = `${Date.now()}_${files.flag.name}`;
    const flagFilePath = join(imagesPath, flagFileName);
    const oldFilePath = files.flag.path; // Get the old file path

    console.log("Moving file from:", oldFilePath); // Log the old file path
    console.log("Moving file to:", flagFilePath); // Log the new file path

    // Move the uploaded file to the images folder
    try {
      renameSync(oldFilePath, flagFilePath);
    } catch (error) {
      console.error("Error moving file:", error);
      throw createError({ statusCode: 500, statusMessage: "File move failed" });
    }

    return { filePath: `/images/${flagFileName}` }; // Return the path to the uploaded image
  }
});
