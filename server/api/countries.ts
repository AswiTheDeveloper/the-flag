import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { readBody } from "h3"; // Import readBody if necessary

const dataFilePath = join(process.cwd(), "data.json");

// Helper function to read data from JSON file
const readData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).countries; // Access the countries array
};

// Helper function to write data to JSON file
const writeData = (countries) => {
  const currentData = JSON.parse(readFileSync(dataFilePath));
  currentData.countries = countries; // Update the countries array
  writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const countries = readData();
    return countries.map((country) => ({
      id: country.id, // Use the existing id
      name: country.name,
      image: country.image, // Use the correct property
    }));
  } else if (event.node.req.method === "POST") {
    const body = await readBody(event); // Use readBody here
    console.log("Received body:", body); // Log the entire body for debugging

    // Ensure body contains the expected fields
    if (!body.name || !body.continent || !body.rank) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    const countries = readData();
    const newCountry = {
      id: Date.now().toString(),
      name: body.name,
      continent: body.continent,
      rank: body.rank,
      flag: "images/no-image.webp",
    };

    countries.push(newCountry);
    writeData(countries);
    return newCountry;
  }
});
