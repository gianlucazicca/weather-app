<script setup>
import { defineProps, computed } from 'vue';
import weatherCodes from '@/assets/weatherCodes.json';
const props = defineProps({
    day: {
        type: Object,
        required: true
    }
});
const temperatureMin = computed(() => {
    return Math.round(props.day.values.temperatureMin);
});
const temperatureMax = computed(() => {
    return Math.round(props.day.values.temperatureMax);
});

const temperatureAvg = computed(() => {
    return Math.round(props.day.values.temperatureAvg);
});

const day = computed(() => {
    const date = new Date(props.day.time);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
});

const condition = computed(() => {
    return weatherCodes.weatherCode[props.day.values.weatherCodeMin].day;
});

const progress = computed(() => {
    return Math.round((temperatureAvg.value - temperatureMin.value) / (temperatureMax.value - temperatureMin.value) * 100);
});

</script>

<template>
    <div class="daily-row">
        <div class="flex justify-between py-2 px-4 text-white">
            <div class="flex justify-between w-5/12">
                <div class="font-semibold">{{ day }}</div>
                <img class="condition-icon" :src="`/assets/weatherIcons/${condition}@3x.png`" alt="" />
            </div>
            <div class="flex items-center justify-end w-7/12">
                <div>{{ temperatureMin }}°</div>
                <div class="h-[3px] rounded-full w-16 bg-sky-700/80 mx-2 overflow-hidden relative">
                    <div :style="{ width: progress + '%' }"
                        class="h-full bg-gradient-to-r from-blue-400 to-yellow-400 absolute top-0 left-0 rounded-full">
                    </div>
                </div>
                <div>{{ temperatureMax }}°</div>
            </div>
        </div>
        <div class="px-4 daily-row--divider--wrapper">
            <div class="daily-row--divider"></div>
        </div>
    </div>
</template>