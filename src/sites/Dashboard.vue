<script setup>
import { getRealtimeWeatherData, getForecastWeatherData } from '../api/get';
import { computed, onMounted, ref } from 'vue';
import { mockRealtimeData, mockForecastData } from '../api/mockData';
import ForecastToday from '../components/ForecastToday.vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import ForecastNextDays from '../components/ForecastNextDays.vue';
import AirQuality from '../components/AirQuality.vue';
import UVIndex from '../components/UVIndex.vue';
const realtime = ref(mockRealtimeData);
const forecast = ref(mockForecastData);
const cordinates = ref(null);
const getGeolocation = async function () {
    const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    cordinates.value = coords;
}


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
//await getRealtimeWeather();
//await getGeolocation();
const { location, timelines: { daily, hourly, monthly } } = forecast.value;

const today = computed(() => {
    return daily.find(({ time }) => {
        const date = new Date(time);
        const now = new Date();
        return date.getDate() === now.getDate();
    })
});



onMounted(async () => {

});

</script>

<template>
    <div id="container" class="w-100 p-6 pb-56">

        <header id="location-current-weather" class="mb-16 mt-8 z-20 sticky top-5">
            <current-weather :locationName="locationName" :currentWeatherData="realtime.data" :dailyWeather="daily" />
        </header>

        <main class="z-10">
            <forecast-today :hourly="hourly" :today="today" />
            <forecast-next-days :daily="daily" />
            <air-quality :airQualityData="realtime.data" />
            <u-v-index :uvIndexData="realtime.data" />
        </main>
    </div>
</template>

<style scoped></style>
