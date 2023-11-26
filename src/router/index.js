import { createRouter, createWebHistory } from 'vue-router';
import ListView from '@/sites/ListView.vue';
import LocationView from '@/sites/LocationView.vue';

const routes = [
  { name: 'locationView', path: '/location/:location_name', component: LocationView },
  { path: '/', component: ListView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
