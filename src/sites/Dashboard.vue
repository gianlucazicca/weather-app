<script setup>
import { ref } from 'vue';
import Location from '../components/Location.vue';
import List from '../components/List.vue';
const items = ['Karlsruhe', 'München', 'Rom']

const currentItem = ref(null);
const show = ref(false);
const open = (i) => {
    currentItem.value = i;
    show.value = !show.value;
}
</script>

<template>
    <div>
        <Transition>
            <Location v-if="show" :data="currentItem" @view="open(i)" />
        </Transition>
        <List v-if="!show" :items="items" @open="open" @view="open(i)" />
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
