import { useGlobalState } from '@/store/store.js';

const store = useGlobalState();

const getLocation = (key) => {
  return store.value.locations.find((loc) => loc.key === key);
};

const setLastViewedLocation = (locationKey) => {
  store.value.lastViewedLocation = locationKey;
};

const updateLocationWeather = (locationKey, type, data) => {
  const location = store.value.locations.find((loc) => loc.key === locationKey);
  if (type === 'forecast') {
    const {
      timelines: { hourly, daily },
    } = data;
    location.weather[type].data = { hourly, daily };
  } else location.weather[type].data = data;
  location.weather[type].lastFetched = new Date().getTime();
};

const removeLocation = (location) => {
  store.value.locations = store.value.locations.filter((loc) => loc.Key !== location.Key);
};

export { updateLocationWeather, removeLocation, setLastViewedLocation, getLocation };
