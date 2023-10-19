<script setup>

</script>

<template>
    <div class="card rounded-xl bg-sky-600 backdrop-blur w-full">
        <div class="card-header text-sky-200 rounded-xl bg-sky-600 font-bold text-left px-2 py-0.5 text-xs leading-5">
            <slot name="card-header"></slot>
        </div>
        <div class="px-2">
            <div class="h-[1px] w-full bg-white/20 rounded-full"></div>
        </div>
        <div class="card-body">
            <slot name="card-body"></slot>
        </div>

    </div>
</template>
