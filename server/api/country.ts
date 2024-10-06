import { readFileSync } from "fs";
import { join } from "path";

const dataFilePath = join(process.cwd(), "data.json");

const readData = () => {
  const data = readFileSync(dataFilePath);
  return JSON.parse(data).countries;
};

export default defineEventHandler(async (event) => {
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

  return {
    id: country.id,
    name: country.name,
    flag: country.flag,
    rank: country.rank,
    continent: country.continent,
  };
});
