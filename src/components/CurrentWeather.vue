<script setup>
import { defineProps, computed, onMounted, onUnmounted, ref, nextTick, onBeforeUpdate } from 'vue';
import weatherCodes from '@/assets/weatherCodes.json'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";



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

const weatherCodeToText = computed(() => {
    return weatherCodes.weatherCode[props.currentWeatherData.values.weatherCode].value;
});

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    nextTick().then(() => {
        const test = gsap.timeline({
            scrollTrigger: {
                trigger: "#current-weather",
                start: `top+=20px 60px`,
                endTrigger: "#current-temperature",
                end: `center 24px`,
                scrub: true,
                toggleActions: "restart none none reverse"
            }
        });
        console.log(test);
        test.to("#heigh-low-temp", { opacity: 0 }).to("#current-temperature", { opacity: 0, }).to("#sub-text", { opacity: 1 });;

    });

});

</script>

<template>
    <div id="current-weather" class="text-white text-center">
        <div id="location-name" class="text-3xl font-medium mb-1 mt-12 relative">
            {{ locationName }}
            <div id="sub-text" class="absolute left-1/2 -translate-x-1/2 opacity-0">
                {{ currentTemperature }}° | {{ weatherCodeToText }}
            </div>
        </div>

        <div id="current-temperature" class="text-8xl font-light mb-3">
            {{ currentTemperature }}°
        </div>
        <div id="heigh-low-temp">
            H: {{ maxTemperature }}° L: {{ minTemperature }}°
        </div>
    </div>
</template>