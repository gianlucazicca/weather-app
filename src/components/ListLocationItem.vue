<script setup>
import { computed, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
const props = defineProps({
    location: Object,
    required: true
});

const realtimeWeather = ref(null);
const forecastWeather = ref(null);

const { data: realtimeData, error: realtimeError } = await useFetch({ nameOrCoords: props.location.localizedName, locationKey: props.location.key, type: 'realtime', unit: 'metric', lastFetched: props.location.weather.realtime.lastFetched });
const { data: forecastData, error: forecastError } = await useFetch({ nameOrCoords: props.location.localizedName, locationKey: props.location.key, type: 'forecast', unit: 'metric', lastFetched: props.location.weather.forecast.lastFetched });

realtimeWeather.value = realtimeData;
forecastWeather.value = forecastData;
if (realtimeError.value || forecastError.value) {
    console.log(realtimeError.value, forecastError.value);
}

const temperature = computed(() => {
    return realtimeData.value ? Math.round(realtimeData.value.data.values.temperature) : '--'
})

</script>

<template>
    <button class="w-11/12 block m-auto mb-6 relative h-24 rounded-3xl t py-2 px-3">
        <div class="flex flex-col w-full justify-between h-full">
            <div class="flex w-full justify-between">
                <div class="text-xl">{{ location.localizedName }}</div>
                <div class="text-xl">{{ temperature }}</div>
            </div>
            <div class="flex w-full justify-between">
                <div>{{ location.localizedName }}</div>
                <div>{{ temperature }}</div>
            </div>
        </div>
    </button>
</template>