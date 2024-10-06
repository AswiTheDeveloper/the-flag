<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchCountryDetails } from "~/utils/service";
import { type Country } from "~/types/countries";
defineProps<{
  countries: Country[];
}>();

const selectedCountry = ref("");
const countryDetails = ref<Country | null>(null);

// Fetch details of the selected country
const getCountryDetails = async () => {
  if (!selectedCountry.value) return;
  try {
    countryDetails.value = await fetchCountryDetails(selectedCountry.value);
  } catch (error) {
    console.error("Error fetching country details:", error);
  }
};
</script>

<template>
  <div>
    <h2>View Flag</h2>
    <select
      v-if="countries?.length > 0"
      v-model="selectedCountry"
      @change="getCountryDetails"
    >
      <option value="">Select a country</option>
      <option
        v-for="country in countries"
        :key="country?.rank"
        :value="country?.name"
      >
        {{ country.name }}
      </option>
    </select>

    <div v-if="countryDetails" class="country-details">
      <h2>Rank: {{ countryDetails.rank }}</h2>
      <img
        :src="'_nuxt/' + countryDetails.flag"
        :alt="countryDetails.name"
        style="width: 200px"
      />
    </div>
  </div>
</template>
<style scoped>
.country-details {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.country-details img {
  border-radius: 1rem;
}
select {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon points="5,7 10,12 15,7" fill="%23333"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 12px;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 20rem;
}

select:focus {
  outline: none;
  border-color: lightblue;
  box-shadow: 0 0 5px lightblue;
  background-color: #f9f9f9;
}
</style>
