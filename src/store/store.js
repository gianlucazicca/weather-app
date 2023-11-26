import { createGlobalState, useStorage } from '@vueuse/core';

const storeKey = 'weather-app-store';
const storeInitValues = {
  geoLocation: {
    isAvailable: false,
    coords: {},
  },
  lastViewedLocation: null,
  currentLocation: {},
  locations: [],
  showList: false,
};
const storeOptions = {
  deep: true,
  writeDefaults: true,
  mergeDefaults: true,
};
export const useGlobalState = createGlobalState(() => useStorage(storeKey, storeInitValues, localStorage, storeOptions));
