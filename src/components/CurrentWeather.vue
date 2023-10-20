<script setup>
import { defineProps, computed, onMounted, onUnmounted, ref } from 'vue';
import weatherCodes from '../assets/weatherCodes.json'
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
    const heighLowTempAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#current-weather",
            start: "-20px 0%",
            end: "40px 0%",
            scrub: true,
            toggleActions: "restart none none reverse"
        }
    });
    const currentWeatherAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#current-weather",
            start: "20px 0%",
            end: "70px 0%",
            scrub: true,
            toggleActions: "restart none none reverse"
        }
    });

    const subTextAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#current-weather",
            start: "60px 0%",
            end: "140px 0%",
            scrub: true,
            toggleActions: "restart none none reverse"
        }
    });
    currentWeatherAnimation.from("#current-temperature", { opacity: 1, duration: 1 });
    currentWeatherAnimation.to("#current-temperature", { opacity: 0, duration: 1 });
    heighLowTempAnimation.from("#heigh-low-temp", { opacity: 1, duration: 1 });
    heighLowTempAnimation.to("#heigh-low-temp", { opacity: 0, duration: 1 });
    subTextAnimation.from("#sub-text", { opacity: 0, duration: 1 });
    subTextAnimation.to("#sub-text", { opacity: 1, duration: 1 });
});

</script>

<template>
    <div id="current-weather" class="text-white text-center">
        <div id="location-name" class="text-3xl font-medium mb-1 relative">
            {{ locationName }}
            <div id="sub-text" class="absolute left-1/2 -translate-x-1/2">
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