import { ref } from 'vue';
import { updateLocationWeather } from '@/store/oldactions';
import { getLocation } from '@/store/oldactions';
const apiKey = import.meta.env.VITE_CLIMA_CELL_API_KEY;
const baseUrl = import.meta.env.VITE_CLIMA_CELL_BASE_URL;
export async function useFetch({ nameOrCoords, type, unit, locationKey, lastFetched }) {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const data = ref(null);
  const error = ref(null);
  const url = `${baseUrl}${type}?location=${nameOrCoords}&units=${unit}&apikey=${apiKey}`;
  const date = new Date();

  if (lastFetched && date.getTime() - lastFetched < 600000) {
    console.log('returning from cache');
    data.value = getLocation(locationKey).weather[type].data;
  } else {
    console.log('fetching from api');
    await fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error('could not fetch the data for that resource');
        else return response.json();
      })
      .then((json) => {
        data.value = json;
      })
      .then(() => {
        updateLocationWeather(locationKey, type, data.value);
      })
      .catch((err) => {
        error.value = err.message;
      });
  }

  return { data, error };
}
