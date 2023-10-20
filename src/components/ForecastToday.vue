<script setup>
import { defineProps, computed } from 'vue';
import ForecastHour from './forecastToday/ForecastHour.vue';
import Card from './Card.vue';
const props = defineProps({
    hourly: {
        type: Array,
        required: true
    },
    sunsetTime: {
        type: String,
        required: true
    },
    sunriseTime: {
        type: String,
        required: true
    },
    today: {
        type: Object,
        required: true
    }
});
const sunsetTime = computed(() => {
    return props.today.values.sunsetTime;
});

const sunriseTime = computed(() => {
    return props.today.values.sunriseTime;
});
const untilNextDay = computed(() => {
    const arr = props.hourly;
    arr.push({ time: sunsetTime.value, values: { temperature: 0, weatherCode: 0 }, isSunset: true })
    arr.push({ time: sunriseTime.value, values: { temperature: 0, weatherCode: 0 }, isSunrise: true })


    let returnArr = arr.filter((item) => {

        const now = new Date(new Date().setMinutes(0, 0, 0));
        const itemDate = new Date(item.time);
        const nextDay = new Date(new Date().setDate(new Date().getDate() + 1));
        return itemDate >= now && itemDate < nextDay;
    });

    return returnArr.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
    });
});


const headerText = "Sunny conditions will countinue for the rest of the day. Wind gusts are up to 36 km/h."
</script>

<template>
    <Card>
        <template #card-header>
            HOURLY FORECAST
        </template>
        <template #card-body>
            <div class="w-full overflow-x-scroll overflow-y-hidden flex">
                <forecast-hour v-for="item in untilNextDay" :hour-weather-data="item" />
            </div>
        </template>
    </Card>
</template>
