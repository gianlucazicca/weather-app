<script setup>
import Card from './Card.vue';
import UVIndex from './detailSection/UVIndex.vue';
</script>

<template>
    <div class="w-full">
        <div class="grid grid-cols-2 gap-4">
            <Card>
                <template #card-header>
                    UV INDEX
                </template>
                <template #card-body>
                    <UVIndex />
                </template>
            </Card>
            <Card>
                <template #card-header>
                    SUNSET
                </template>
                <template #card-body>
                    2
                </template>
            </Card>
        </div>
    </div>
</template>

