<script setup>
import { defineProps, computed } from 'vue';
import weatherCodes from '../../assets/weatherCodes.json';
const props = defineProps({
    hourWeatherData: {
        type: Object,
        required: true,
        default: () => ({
            time: new Date(),
            values: {
                temperature: 0,
                weatherCode: 0
            }
        })
    }
});

const weatherCode = computed(() => {
    return props.hourWeatherData.values.weatherCode;
});

const hour = computed(() => {
    const isNow = new Date(props.hourWeatherData.time).setMinutes(0, 0, 0) === new Date().setMinutes(0, 0, 0);
    let hour = new Date(props.hourWeatherData.time).getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    return isNow ? 'Now' : hour;
});

const temperature = computed(() => {
    return Math.round(props.hourWeatherData.values.temperature) + '°';
});

const isNow = computed(() => {
    return
});

const weatherCodeToEmoji = computed(() => {
    return weatherCodes.weatherCode[weatherCode.value].icon;
});
</script>

<template>
    <div class="text-white pl-2 py-2 pr-5 text-base">
        <div>
            {{ hour }}
        </div>
        <div class="text-2xl pt-2 pb-2">
            {{ weatherCodeToEmoji }}
        </div>
        <div>
            {{ temperature }}
        </div>
    </div>
</template>