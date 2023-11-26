<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Location from '@c/Location.vue';
import { useMainStore } from '@/store/mainStore';
import { storeToRefs } from 'pinia';
const route = useRoute();
const mainStore = useMainStore();
const { locations } = storeToRefs(mainStore);

const viewLocation = computed(() => {
    return locations.value.find((location) => {
        if (location.key === route.params.location_name) {
            console.log(location, 'location')
            return location;
        }
    })
})
</script>

<template>
    <Location :data="viewLocation" />
</template>