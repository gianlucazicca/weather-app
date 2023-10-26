<script setup>
import BaseLayout from './layouts/BaseLayout.vue';
import Dashboard from '@/sites/Dashboard.vue';
</script>

<template>
  <base-layout>
    <Suspense>
      <template #default>
        <Dashboard />
      </template>
    </Suspense>
  </base-layout>
</template>

<style></style>
