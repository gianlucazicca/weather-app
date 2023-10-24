<script setup>
import { computed } from 'vue';
import Dashboard from '@/sites/Dashboard.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
const activeComponent = computed(() => {
  return Dashboard;
});
</script>

<template>
  <base-layout>
    <Suspense>
      <template #default>
        <component :is="activeComponent" />
      </template>
    </Suspense>
  </base-layout>
</template>

<style></style>
