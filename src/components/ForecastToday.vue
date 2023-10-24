<script setup>
import { defineProps, computed } from 'vue';
import ForecastHour from '@c/forecastToday/ForecastHour.vue';
import Card from '@c/Card.vue';
const props = defineProps({
    hourly: {
        type: Array,
        required: true
    },
    today: {
        type: Object,
        required: true
    },
    nextDay: {
        type: Object,
        required: true
    }
});
const sunsetTimes = computed(() => {
    return props.today.values.sunsetTime;
});

const sunriseSunsetTimes = computed(() => {
    return { sunset: props.today.values.sunsetTime, sunrise: props.today.values.sunriseTime };
});
const untilNextDay = computed(() => {
    const hourlyArr = props.hourly;
    const sunsetSunriseTimes = [
        {
            time: props.today.values.sunriseTime,
            isSunset: false,
            isSunrise: true,
            values: {
                weatherCode: 9990
            }
        },
        {
            time: props.today.values.sunsetTime,
            isSunset: true,
            isSunrise: false,
            values: {
                weatherCode: 9991
            }
        },
        {
            time: props.nextDay.values.sunriseTime,
            isSunset: false,
            isSunrise: true,
            values: {
                weatherCode: 9990
            }
        },
        {
            time: props.nextDay.values.sunsetTime,
            isSunset: true,
            isSunrise: false,
            values: {
                weatherCode: 9991
            }

        }
    ];

    const arr = [...hourlyArr, ...sunsetSunriseTimes];

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

const isNight = (item) => {
    const actualTime = new Date(item.time)
    return actualTime > new Date(props.today.values.sunsetTime) && actualTime < new Date(props.nextDay.values.sunriseTime);
};
const weatherContext = (item) => {
    return item.isSunrise ? 'sunrise' : item.isSunset ? 'sunset' : 'condition';
};
const headerText = "Sunny conditions will countinue for the rest of the day. Wind gusts are up to 36 km/h."
</script>

<template>
    <Card>
        <template #card-header>
            HOURLY FORECAST
        </template>
        <template #card-body>
            <div class="w-full overflow-x-scroll overflow-y-hidden flex gap-6 py-2 px-4 snap-x snap-mandatory">
                <forecast-hour v-for="item in untilNextDay" :hour-weather-data="item" :is-night="isNight(item)"
                    :context="weatherContext(item)" />
            </div>
        </template>
    </Card>
</template>
