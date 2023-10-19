<script setup>
import { defineProps, computed, onMounted } from 'vue';
const props = defineProps({
    locationName: String,
    currentWeatherData: Object,
    dailyWeather: Object
});

const dailyWeather = computed(() => {
    if (!props.dailyWeather) return;
    else return props.dailyWeather.find(({ time }) => {
        const date = new Date(time);
        const now = new Date();
        return date.getDate() === now.getDate();
    })
});

const currentTemperature = computed(() => {
    if (!props.currentWeatherData) return;
    else return Math.round(props.currentWeatherData.values.temperature);
});
const maxTemperature = computed(() => {
    if (!dailyWeather.value) return;
    else return Math.round(dailyWeather.value.values.temperatureMax);
});

const minTemperature = computed(() => {
    if (!dailyWeather.value) return;
    else return Math.round(dailyWeather.value.values.temperatureMin);
});
</script>

<template>
    <div id="current-weather" class="text-white mb-6 text-center">
        <div id="location-name" class="text-3xl font-medium mb-3">
            {{ locationName }}
        </div>
        <div class="text-7xl font-light mb-6">
            {{ currentTemperature }}°
        </div>
        <div>
            H: {{ maxTemperature }}° L: {{ minTemperature }}°
        </div>
    </div>
</template>