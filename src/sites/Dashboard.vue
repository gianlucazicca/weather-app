<script setup>
import Location from '../components/Location.vue';
import List from '../components/List.vue';
import { onBeforeMount, ref } from 'vue';
import { setLastViewedLocation, getLocation } from '../store/oldactions';
import { useMainStore } from '@/store/mainStore';
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
    setLastViewedLocation(data.key);
    toggleList();
}

const toggleList = () => {
    mainStore.showList = !mainStore.showList;
}
</script>

<template>
    <div>
        <div>
            <Transition>
                <Location v-if="false" :data="viewedLocation" @show-list="toggleList" />
            </Transition>
        </div>
        <div>
            <Transition>
                <List v-if="true" :locations="mainStore.locations" @view="openLocationView" />
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.v-enter-active {
    transition: opacity 350ms ease-in-out;
}

.v-leave-active {
    transition: opacity 250ms ease-in-out;
}

.v-enter-from {
    opacity: 1;
}

.v-leave-to {
    opacity: 0;
}
</style>
