import { defineStore } from 'pinia';
import { Location } from '@/models/Location.model';
const apiKey = import.meta.env.VITE_CLIMA_CELL_API_KEY;
const baseUrl = import.meta.env.VITE_CLIMA_CELL_BASE_URL;
const searchApiKey = import.meta.env.VITE_ACCU_WEATHER_API_KEY;
const searchBaseUrl = import.meta.env.VITE_ACCU_WEATHER_BASE_URL;

export const useMainStore = defineStore('main', {
  state: () => ({
    geoLocation: {
      isAvailable: false,
      coords: null,
    },
    lastViewedLocation: null,
    currentLocation: {},
    locations: [],
    showList: true,
    language: 'de-de',
  }),
  persist: {
    enabled: true,
    key: 'weather-app-store',
  },
  getters: {
    getGeoLocation: (state) => state.geoLocation,
  },
  actions: {
    test(location) {
      const { LocalizedName, AdministrativeArea, Country, Key } = location;
      const newLocation = new Location({ key: Key, localizedName: LocalizedName, administrativeArea: AdministrativeArea, country: Country });
      this.locations.push(newLocation);
    },
    async searchLocation(queryString) {
      console.log('searching location', this.language);
      const url = `${searchBaseUrl}/locations/v1/cities/autocomplete?apikey=${searchApiKey}&q=${queryString}&language=${this.language}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw Error('could not fetch the data for that resource');
        else return await res.json();
      } catch (err) {
        console.log(err.message);
      }
    },

    async fetchWeather({ nameOrCoords, type, unit, locationKey, lastFetched }) {
      console.log('fetching weather in mainStore');
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      const url = `${baseUrl}${type}?location=${nameOrCoords}&units=${unit}&apikey=${apiKey}`;
      const date = new Date();
      if (lastFetched && date.getTime() - lastFetched < 600000) {
        console.log('returning from cache');
      } else {
        console.log('fetching from api');
        try {
          const response = await fetch(url, options);
          if (!response.ok) throw Error('could not fetch the data for that resource');
          const json = await response.json();
          this.updateLocationWeather(locationKey, type, json);
          return json;
        } catch (err) {
          console.log(err.message);
        }
      }
    },
    addNewLocation(location) {
      const { LocalizedName, AdministrativeArea, Country, Key } = location;
      const newLocation = new Location({ key: Key, localizedName: LocalizedName, administrativeArea: AdministrativeArea, country: Country });
      this.locations.push(newLocation);
    },
    updateLocationWeather(locationKey, type, data) {
      console.log('updating location weather', locationKey, type, data);
    },
  },
});
