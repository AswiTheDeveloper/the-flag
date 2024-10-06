import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { readBody } from "h3";

const dataFilePath = join(process.cwd(), "data.json");

const readData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).countries;
};

// Helper function to write data to JSON file
const writeData = (countries) => {
  const currentData = JSON.parse(readFileSync(dataFilePath));
  currentData.countries = countries;
  writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));
};

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const countries = readData();
    return countries.map((country) => ({
      id: country.id,
      name: country.name,
      image: country.image,
    }));
  } else if (event.node.req.method === "POST") {
    const body = await readBody(event);
    console.log("Received body:", body);

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
