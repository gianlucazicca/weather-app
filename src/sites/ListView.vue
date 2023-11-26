<script setup>
import List from '@c/List.vue';
import { onBeforeMount, ref } from 'vue';
import { useMainStore } from '@/store/mainStore';
import { useRouter } from 'vue-router';
const router = useRouter();
const mainStore = useMainStore();
const viewedLocation = ref(null);
onBeforeMount(() => {
    if (mainStore.lastViewedLocation !== null) {
        viewedLocation.value = getLocation(mainStore.lastViewedLocation);
        openLocationView(viewedLocation.value);
    } else {
        console.log('no lastViewedLocation')
    }
})

const openLocationView = (data) => {
    console.log(data, 'data')
    router.push({ name: 'locationView', params: { location_name: data.key } });
}
</script>

<template>
    <List :locations="mainStore.locations" @view="openLocationView" />
</template>

