import { ref } from 'vue';
const apiKey = import.meta.env.VITE_CLIMA_CELL_API_KEY;
const baseUrl = import.meta.env.VITE_CLIMA_CELL_BASE_URL;
export function useFetch(city, unit, type) {
  const data = ref(null);
  const error = ref(null);
  const url = `${baseUrl}${type}?location=${city}&units=${unit}&apikey=${apiKey}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
