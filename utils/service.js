// utils/apiService.js

export const fetchCountries = async () => {
  try {
    const { data } = await useFetch("/api/countries");
    return data.value; // Return the countries array
  } catch (error) {
    console.error("Error fetching countries:", error);
    return []; // Return an empty array on error
  }
};

export const fetchCountryDetails = async (countryName) => {
  try {
    const { data } = await useFetch(`/api/country?name=${countryName}`);
    return data.value; // Return the country details
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null; // Return null on error
  }
};

export const addCountry = async (countryData) => {
  try {
    const { data } = await useFetch("/api/countries", {
      method: "POST",
      body: countryData, // Send the body as a normal object
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.value; // Return the newly added country
  } catch (error) {
    console.error("Failed to add country:", error);
    throw new Error("Failed to add country: " + error.message);
  }
};
