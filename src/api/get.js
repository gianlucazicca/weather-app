const apiKey = import.meta.env.VITE_CLIMA_CELL_API_KEY;
const city = 'karlsruhe';
const unit = 'metric';
const options = { method: 'GET', headers: { accept: 'application/json' } };

const getForecastWeatherData = async function () {
  return await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${city}&units=${unit}&apikey=${apiKey}`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};

const getRealtimeWeatherData = async function () {
  return await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=${unit}&apikey=${apiKey}`, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));
};

export { getForecastWeatherData, getRealtimeWeatherData };
