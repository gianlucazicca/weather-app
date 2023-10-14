<script setup>
import { getRealtimeWeatherData, getForecastWeatherData } from '../api/get';
import { computed, ref } from 'vue';
import { mockRealtimeData, mockForecastData } from '../api/mockData';
import ForecastToday from '../components/ForecastToday.vue';
const realtime = ref(mockRealtimeData);
const forecast = ref(mockForecastData);



const getRealtimeWeather = async function () {
    realtime.value = await getRealtimeWeatherData();
    console.log(realtime.value);
}

const getForecastWeather = async function () {
    forecast.value = await getForecastWeatherData();
}

const locationName = computed(() => {
    return realtime.value.location ? realtime.value.location.name.split(',')[0] : '-';
});
//await getForecastWeather();
const { location, timelines: { daily, hourly, monthly } } = forecast.value;
</script>

<template>
    <div class="w-100 text-center relative">

        <div class="text-3xl text-white font-medium mb-3">
            {{ locationName }}
        </div>
        <div class="text-7xl text-white font-light mb-6">
            {{ realtime.data.values.temperature }}°
        </div>
        <forecast-today :hourly="hourly" />
    </div>
</template>

<style scoped></style>
