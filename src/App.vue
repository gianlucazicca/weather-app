<script setup>
import { onMounted, ref, watch } from 'vue';
import BaseLayout from './layouts/BaseLayout.vue';
import Dashboard from '@/sites/Dashboard.vue';
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
        <Dashboard />
      </template>
    </Suspense>
  </base-layout>
</template>

<style></style>
