<script setup>
import Dashboard from './sites/Dashboard.vue';
import BaseLayout from './layouts/BaseLayout.vue';
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

<style scoped></style>
