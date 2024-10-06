<script setup lang="ts">
import { ref } from "vue";
import { addCountry } from "~/utils/service";

const emit = defineEmits<{ loadCountries: [] }>();
const newCountry = ref({ name: "", continent: "", rank: "" });
const hasError = ref(false);
const errorMessage = ref("*Oops! It looks like you missed a field!");

const addNewCountry = async () => {
  if (
    newCountry.value.name &&
    newCountry.value.continent &&
    newCountry.value.rank
  ) {
    try {
      await addCountry(newCountry.value);
      alert("Country added successfully!");
      newCountry.value = { name: "", continent: "", rank: "" };
      emit("loadCountries");
    } catch (error: any) {
      console.error("Failed to add country:", error);
      alert("Failed to add country: " + error.message);
    }
    hasError.value = false;
  } else {
    hasError.value = true;
  }
};
</script>

<template>
  <div>
    <h2>Add New Country</h2>
    <form @submit.prevent="addNewCountry">
      <input
        type="text"
        v-model="newCountry.name"
        placeholder="Country Name"
        :class="{ 'input-error': !newCountry.name && hasError }"
      />
      <p v-if="!newCountry.name && hasError">{{ errorMessage }}</p>

      <input
        type="text"
        v-model="newCountry.continent"
        placeholder="Continent"
        :class="{ 'input-error': !newCountry.continent && hasError }"
      />
      <p v-if="!newCountry.continent && hasError">{{ errorMessage }}</p>

      <input
        type="number"
        v-model="newCountry.rank"
        placeholder="Rank"
        :class="{ 'input-error': !newCountry.rank && hasError }"
      />
      <p v-if="!newCountry.rank && hasError">{{ errorMessage }}</p>

      <button type="submit">Add Country</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  width: 20rem;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #cccccc;
  transition: border-color 0.3s, box-shadow 0.3s;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #add8e6;
  background-color: #f9f9f9;
}

input::placeholder {
  color: #aaaaaa;
  opacity: 1;
}

input:disabled {
  background-color: #f0f0f0;
  border-color: #dddddd;
  color: #999999;
}

.input-error {
  border-color: #ff0000;
  border-width: 2px;
}

button[type="submit"] {
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  border: none;
  background-color: #007bff;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="submit"]:active {
  transform: scale(0.98);
}

p {
  all: unset;
  color: #ff0000;
  padding-left: 0.2rem;
  margin-top: -0.5rem;
  font-size: 14px;
}
</style>
