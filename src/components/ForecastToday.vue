<script setup>
import { defineProps, computed } from 'vue';
import ForecastHour from './forecastToday/ForecastHour.vue';
import Card from './Card.vue';
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
