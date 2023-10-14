<script setup>
import { defineProps, computed } from 'vue';
import ForecastHour from './forecastToday/ForecastHour.vue';

const props = defineProps({
    hourly: {
        type: Array,
        required: true
    }
});

const untilNextDay = computed(() => {
    return props.hourly.filter((item) => {
        const now = new Date(new Date().setMinutes(0, 0, 0));
        const itemDate = new Date(item.time);
        const nextDay = new Date(new Date().setDate(new Date().getDate() + 1));
        return itemDate >= now && itemDate < nextDay;
    });
});

</script>

<template>
    <div class="rounded-xl bg-sky-600/50 backdrop-blur w-full">
        <div class="text-white text-left p-2 text-sm leading-5">
            Sunny conditions will countinue for the rest of the day. Wind gusts are up to 36 km/h.
        </div>
        <div class="px-2">
            <div class="h-[1px] w-full bg-white/50 rounded-full"></div>
        </div>
        <div class="w-full overflow-x-scroll overflow-y-hidden flex">
            <forecast-hour v-for="item in untilNextDay" :hour-weather-data="item" />
        </div>
    </div>
</template>
