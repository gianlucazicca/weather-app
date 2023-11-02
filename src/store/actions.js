import { useGlobalState } from '@/store/store.js';
import { Location } from '@/models/Location.model';

const store = useGlobalState();
const addLoaction = (location) => {
  const { LocalizedName, AdministrativeArea, Country, Key } = location;
  const newLocation = new Location({ key: Key, localizedName: LocalizedName, administrativeArea: AdministrativeArea, country: Country });
  store.value.locations.push(newLocation);
};

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

export { addLoaction, updateLocationWeather, removeLocation, setLastViewedLocation, getLocation };
