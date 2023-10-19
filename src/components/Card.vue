<script setup>

</script>

<template>
    <div class="rounded-xl bg-sky-600/50 backdrop-blur w-full overflow-hidden relative">
        <div class="text-sky-200 font-bold text-left px-2 py-0.5 text-xs leading-5">
            <slot name="card-header"></slot>
        </div>
        <div class="px-2">
            <div class="h-[1px] w-full bg-white/20 rounded-full"></div>
        </div>
        <slot name="card-body"></slot>
    </div>
</template>
