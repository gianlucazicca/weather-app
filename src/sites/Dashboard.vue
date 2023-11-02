<script setup>
import Location from '../components/Location.vue';
import List from '../components/List.vue';
import { useGlobalState } from '@/store/store';
import { onBeforeMount, ref } from 'vue';
import { setLastViewedLocation, getLocation } from '../store/actions';
const state = useGlobalState();
const viewedLocation = ref(null);
onBeforeMount(() => {
    console.log(state.value.lastViewedLocation, 'lastViewedLocation')
    if (state.value.lastViewedLocation) {
        viewedLocation.value = getLocation(state.value.lastViewedLocation);
        openLocationView(viewedLocation.value);
    } else {
        console.lg('no lastViewedLocation')
    }
})
const openLocationView = (data) => {
    console.log(data, 'data')
    setLastViewedLocation(data.key);
    toggleList();
}

const toggleList = () => {
    state.value.showList = !state.value.showList;
}
</script>

<template>
    <div>
        <div>
            <Transition>
                <Location v-if="!state.showList" :data="viewedLocation" @show-list="toggleList" />
            </Transition>
        </div>
        <div>
            <Transition>
                <List v-if="state.showList" :locations="state.locations" @view="openLocationView" />
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
