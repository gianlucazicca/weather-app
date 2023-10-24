<script setup>
import Card from '@c/Card.vue';
</script>

<template>
    <Card>
        <template #card-header>
            AIR QUALITY
        </template>
        <template #card-body>
            <div class="w-full text-left px-2 py-1 text-white font-bold">
                Good
            </div>
            <div class="px-2 py-1">
                <div class="w-full rounded-full h-[5px] air-quality-gradient relative">
                    <div class="h-[5px] w-[5px] rounded-full absolute bg-white left-12">
                    </div>
                </div>
            </div>
            <div class="text-left text-xs text-white p-2">
                Air quality is very good today.
            </div>

        </template>
    </Card>
</template>

<style scoped>
.air-quality-gradient {
    background: rgb(98, 204, 255);
    background: linear-gradient(90deg, rgba(98, 204, 255, 1) 0%, rgba(28, 255, 44, 1) 33%, rgba(254, 252, 8, 1) 66%, rgba(255, 0, 0, 1) 100%);
}
</style>