import weatherCodes from '@/assets/weatherCodes.json';
export function useWeatherCodeInfo(weatherCode) {
  const weatherCodeInfo = weatherCodes.weatherCode[weatherCode];
  return { weatherCodeInfo };
}
