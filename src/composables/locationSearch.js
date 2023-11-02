import { ref } from 'vue';
const apiKey = import.meta.env.VITE_ACCU_WEATHER_API_KEY;
const baseUrl = import.meta.env.VITE_ACCU_WEATHER_BASE_URL;
const language = 'de-de';
export async function useLocationSearch(queryString) {
  const data = ref(queryString);
  const error = ref(null);
  const url = `${baseUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${queryString}&language=${language}`;
  await fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
