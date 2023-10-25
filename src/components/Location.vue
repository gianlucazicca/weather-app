<script setup>
import { getRealtimeWeatherData, getForecastWeatherData } from '../api/get';
import { computed, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, ref } from 'vue';
import { mockRealtimeData, mockForecastData } from '../api/mockData';
import ForecastToday from '../components/ForecastToday.vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import ForecastNextDays from '../components/ForecastNextDays.vue';
import AirQuality from '../components/AirQuality.vue';
import UVIndex from '../components/UVIndex.vue';
import { gsap } from 'gsap';
const props = defineProps({
    name: String
});

const emit = defineEmits(['view']);
const realtime = ref(mockRealtimeData);

const forecast = ref(mockForecastData);
const cordinates = ref(null);
const getGeolocation = async function () {
    const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    cordinates.value = coords;
}


const getRealtimeWeather = async function () {
    realtime.value = await getRealtimeWeatherData();
    console.log(realtime.value);
}

const getForecastWeather = async function () {
    forecast.value = await getForecastWeatherData();
}

const locationName = computed(() => {
    return realtime.value.location ? realtime.value.location.name.split(',')[0] : '-';
});
//await getForecastWeather();
//await getRealtimeWeather();
//await getGeolocation();
const { location, timelines: { daily, hourly, monthly } } = forecast.value;

const today = computed(() => {
    return daily.find(({ time }) => {
        const date = new Date(time);
        const now = new Date();
        return date.getDate() === now.getDate();
    })
});

const nextDay = computed(() => {
    return daily.find(({ time }) => {
        const date = new Date(time);
        const now = new Date();
        return date.getDate() === now.getDate() + 1;
    })
});

onBeforeMount(() => {
    console.log(window.scrollY);
    window.scrollTo(0, 0);
})

onMounted(() => {
    console.log('mount');
    gsap.fromTo('#content', { opacity: 0 }, { opacity: 1, duration: .5 });
})

onBeforeUnmount(() => {
    console.log('unmount');
    window.scrollTo(0, 0);
})


</script>

<template>
    <div id="location-wrapper" class="location p-6 pb-56z-50 min-h-screen">
        <div id="content">
            <header id="location-current-weather" class="z-20">
                <current-weather :locationName="locationName" :currentWeatherData="realtime.data" :dailyWeather="daily" />
            </header>

            <main id="location-main" class="z-10">
                <forecast-today id="today" :hourly="hourly" :today="today" :nextDay="nextDay" />
                <forecast-next-days :daily="daily" />
                <air-quality :airQualityData="realtime.data" />
                <u-v-index :uvIndexData="realtime.data" />
            </main>
            <footer>
                <button @click="$emit('view')">List</button>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.z {
    z-index: 99999
}

#location-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: calc(var(--vp-gutter) * -2);
    position: relative;
    z-index: 0;
    margin: auto;
    @apply max-w-xl
}

#location-main>*:not(.tile) {
    grid-column: 1 / -1;
}

#location-main::before {
    content: "";
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    margin: auto;
    width: 100%;
    height: calc(var(--offset) * 1);
    z-index: 1;
    display: block;
    margin: auto;
    background: linear-gradient(var(--bg), var(--bg));
    @apply max-w-xl
}
</style>
