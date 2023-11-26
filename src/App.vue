<script setup>
import { ref } from 'vue';
import BaseLayout from './layouts/BaseLayout.vue';
import { useGlobalState } from './store/store';
const state = useGlobalState();
const location = ref(null);
if ("geolocation" in navigator) {
  console.log("Available");
  navigator.geolocation.getCurrentPosition((position) => {
    state.value.geoLocation.coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    state.value.geoLocation.isAvailable = false;
  });
} else {
  console.log("Not Available");

}



</script>

<template>
  <base-layout>
    {{ location }}
    <Suspense>
      <template #default>
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
      </template>
    </Suspense>
  </base-layout>
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
