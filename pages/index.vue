<script setup lang="ts">
import { ref } from "vue";
import AddFlag from "~/components/AddFlag.vue";
import ViewFlag from "~/components/ViewFlag.vue";
import { type Country } from "~/types/countries";
const countries = ref<Country[] | null>(null);

const getCountries = async () => {
  countries.value = await fetchCountries();
  console.log(countries.value);
};
</script>

<template>
  <main>
    <template v-if="countries !== null">
      <ViewFlag :countries="countries" />
    </template>
    <template v-else>
      <button @click="getCountries">Fetch Countries</button>
    </template>
    <AddFlag @load-countries="getCountries" />
  </main>
</template>
<style scoped>
main {
  font-family: "Roboto", sans-serif;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  background-color: #007bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: normal;
  font-size: 14px;
  margin-top: 2rem;
}
</style>
