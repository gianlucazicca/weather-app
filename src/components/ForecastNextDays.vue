<script setup>
import ForecastDaily from '@c/forecastNextDays/ForecastDaily.vue';
import Card from './Card.vue';
const props = defineProps({
    daily: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <Card>
        <template #card-header>
            10-Day Forecast
        </template>
        <template #card-body>
            <div class="w-full daily-row-container">
                <forecast-daily v-for="day in props.daily" :day="day" />
            </div>
        </template>
    </Card>
</template>