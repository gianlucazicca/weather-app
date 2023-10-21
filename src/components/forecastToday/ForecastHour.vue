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
    let minutes = new Date(props.hourWeatherData.time).getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (props.hourWeatherData.isSunset || props.hourWeatherData.isSunrise) return hour + ':' + minutes;
    else return isNow ? 'Now' : hour;
});

const temperature = computed(() => {
    return Math.round(props.hourWeatherData.values.temperature) + '°';
});


const weatherCodeToEmoji = computed(() => {
    return weatherCodes.weatherCode[weatherCode.value].icon;
});
</script>

<template>
    <div v-if="!hourWeatherData.isSunset && !hourWeatherData.isSunrise" class="text-white text-base text-center">
        <div>
            {{ hour }}
        </div>
        <div class="text-2xl py-1">
            {{ weatherCodeToEmoji }}
        </div>
        <div>
            {{ temperature }}
        </div>
    </div>
    <div v-else class="text-white text-base text-center">
        <div>
            {{ hour }}
        </div>
        <div class="text-2xl py-1">
            {{ weatherCodeToEmoji }}
        </div>
        <div>
            {{ hourWeatherData.isSunset ? 'Sunset' : 'Sunrise' }}
        </div>
    </div>
</template>