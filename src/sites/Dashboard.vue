<script setup>
import { getRealtimeWeatherData, getForecastWeatherData } from '../api/get';
import { computed, onMounted, ref } from 'vue';
import { mockRealtimeData, mockForecastData } from '../api/mockData';
import ForecastToday from '../components/ForecastToday.vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import ForecastNextDays from '../components/ForecastNextDays.vue';
import AirQuality from '../components/AirQuality.vue';
import DetailSection from '../components/DetailSection.vue';
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



onMounted(async () => {

});

</script>

<template>
    <div id="container" class="w-100 h-screen p-6 pb-56 relative">
        <section id="location-current-weather">
            <current-weather :locationName="locationName" :currentWeatherData="realtime.data" :dailyWeather="daily" />
        </section>

        <section>
            <forecast-today class="mb-4" :hourly="hourly" />
            <forecast-next-days class="mb-4" :daily="daily" />
            <air-quality class="mb-4" :airQualityData="realtime.data" />
        </section>
        <section>
            <detail-section />
        </section>

        <div class="h-[600px]">

        </div>
    </div>
</template>

<style scoped></style>
