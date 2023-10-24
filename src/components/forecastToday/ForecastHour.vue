<script setup>
import { defineProps, computed } from 'vue';
import { useWeatherCodeInfo } from '@/composables/weatherCodeInfo';
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
    },
    isNight: {
        type: Boolean,
        required: true,
        default: false
    },
    context: {
        type: String,
        required: true,
        default: 'condition'
    }
});
const uri = "../../assets/weatherIcons/";

const hour = computed(() => {
    const isNow = new Date(props.hourWeatherData.time).setMinutes(0, 0, 0) === new Date().setMinutes(0, 0, 0);
    let hour = new Date(props.hourWeatherData.time).getHours();
    hour < 10 ? hour = '0' + hour : hour;
    let minutes = new Date(props.hourWeatherData.time).getMinutes();
    minutes < 10 ? minutes = '0' + minutes : minutes;
    if (props.context !== 'condition') return hour + ':' + minutes;
    else return isNow ? 'Now' : hour;
});

const temperature = computed(() => {
    return Math.round(props.hourWeatherData.values.temperature) + '°';
});


const weatherCodeToEmoji = computed(() => {
    let weatherCode;

    switch (props.context) {
        case 'condition':
            weatherCode = props.hourWeatherData.values.weatherCode;
        case 'sunrise':
            weatherCode = 9990
        case 'sunset':
            weatherCode = 9991
        default:
            weatherCode = props.hourWeatherData.values.weatherCode;
    }
    const { weatherCodeInfo } = useWeatherCodeInfo(weatherCode);
    return props.isNight ? weatherCodeInfo.night : weatherCodeInfo.day;
});


</script>

<template>
    <div class="text-white text-base text-center h-[90px] flex flex-col items-center justify-between">
        <div>
            {{ hour }}
        </div>
        <div>
            <img class="condition-icon" :src="`/assets/weatherIcons/${weatherCodeToEmoji}@3x.png`" alt="" />
        </div>
        <div v-if="context === 'condition'">
            {{ temperature }}
        </div>
        <div v-else>
            {{ context === 'sunset' ? 'Sunset' : 'Sunrise' }}
        </div>
    </div>
</template>