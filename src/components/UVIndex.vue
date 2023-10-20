<script setup>
import Card from './Card.vue';
</script>

<template>
    <Card class="tile">
        <template #card-header>
            UV INDEX
        </template>
        <template #card-body>

            <div class="w-full text-left px-2 py-1 text-white font-bold">
                2 LOW
            </div>
            <div class="px-2 py-1">
                <div class="w-full rounded-full h-[5px] air-quality-gradient relative">
                    <div class="h-[5px] w-[5px] rounded-full absolute bg-white left-12">
                    </div>
                </div>
            </div>
            <div class="text-left text-xs text-white p-2">
                Low for the rest of the day.
            </div>


        </template>
    </Card>
</template>

<style scoped>
.air-quality-gradient {
    background: rgb(98, 204, 255);
    background: linear-gradient(90deg, rgba(98, 204, 255, 1) 0%, rgba(28, 255, 44, 1) 25%, rgba(254, 252, 8, 1) 50%, rgba(255, 0, 0, 1) 75%, rgb(208, 0, 255) 90%);
}
</style>