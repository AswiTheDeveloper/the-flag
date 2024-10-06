// utils/apiService.js

export const fetchCountries = async () => {
  try {
    const { data } = await useFetch("/api/countries");
    return data.value;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return []; 
  }
};

export const fetchCountryDetails = async (countryName) => {
  try {
    const { data } = await useFetch(`/api/country?name=${countryName}`);
    return data.value; 
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null; 
  }
};

export const addCountry = async (countryData) => {
  try {
    const { data } = await useFetch("/api/countries", {
      method: "POST",
      body: countryData, 
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.value; 
  } catch (error) {
    console.error("Failed to add country:", error);
    throw new Error("Failed to add country: " + error.message);
  }
};
