export class Location {
  constructor(location) {
    const defaultLocation = {
      administrativeArea: null,
      country: null,
      key: null,
      localizedName: '',
      coords: null,
      weather: {
        forecast: {
          data: null,
          lastFetched: null,
        },
        realtime: {
          data: null,
          lastFetched: null,
        },
      },
    };

    const values = Object.assign({}, defaultLocation, location);
    this.administrativeArea = values.administrativeArea;
    this.country = values.country;
    this.key = values.key;
    this.localizedName = values.localizedName;
    this.coords = values.coords;
    this.weather = values.weather;
  }
}
