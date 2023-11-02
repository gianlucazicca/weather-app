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
    const style = getComputedStyle(document.body)
    const start = style.getPropertyValue('--ani-start');
    const end = style.getPropertyValue('--ani-end');


    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
        const test = gsap.timeline({
            scrollTrigger: {
                trigger: "#today",
                start: `top ${start}`,
                end: `center ${end}`,
                scrub: true,
                toggleActions: "restart none none reverse"
            }
        });
        test.to("#heigh-low-temp", { opacity: 0 }).to("#current-temperature", { opacity: 0, }).to("#sub-text", { opacity: 1 });;

    }, 500);
});

onUnmounted(() => {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
        trigger.kill();
    });
});

</script>

<template>
    <div id="current-weather" class="text-white text-center pb-8">
        <div id="location-name" class="text-3xl font-medium mb-1 mt-12">
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