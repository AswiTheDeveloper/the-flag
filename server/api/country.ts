import { readFileSync } from "fs";
import { join } from "path";

const dataFilePath = join(process.cwd(), "data.json");

const readData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).countries; // Access the countries array
};

export default defineEventHandler(async (event) => {
  // Extract the country name from query parameters
  const { name } = getQuery(event);

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Country name is required",
    });
  }

  const countries = readData();
  const country = countries.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!country) {
    throw createError({ statusCode: 404, statusMessage: "Country not found" });
  }

  // Return the found country with its details
  return {
    id: country.id,
    name: country.name,
    flag: country.flag, // Assuming the flag filename is stored in the JSON
    rank: country.rank, // Include the rank if it's part of your data
    continent: country.continent,
  };
});
