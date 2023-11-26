<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';
import { useMainStore } from '@/store/mainStore';
import ListLocationItem from '@c/ListLocationItem.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocationSearch } from '@/composables/locationSearch';
import { storeToRefs } from 'pinia';
const emits = defineEmits(['view']);
const props = defineProps({
    locations: {
        type: Array,
        required: true
    },
});
const mainStore = useMainStore();
const showSearchContainer = ref(false);
const searchInput = ref(null);
const searchResults = ref([]);
const timeout = ref(null)
//set background color and animation for list
onBeforeMount(() => {
    document.body.style.background = 'rgba(0,0,0,1)';
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
        const tlList = gsap.timeline({
            scrollTrigger: {
                trigger: "#sub-header",
                start: `top top`,
                endTrigger: "#list-header",
                end: `bottom top`,
                scrub: true,
                toggleActions: "restart none none reverse"
            }
        });

        tlList
            .to('#list-header-title', { opacity: 0 })
            .to('#list-header-title', { height: 0 })
            .fromTo('#sub-header-text', { opacity: 0 }, { opacity: 1 });

    }, 500);
});

onMounted(() => {
    console.log(mainStore, '#########')
    gsap.to('#list-header', { opacity: 1, duration: .350, delay: .250 });
    gsap.to('#list-container', { opacity: 1, duration: .350, delay: .250 });
})
const focusSearchInput = () => {
    showSearchContainer.value = true;
}
const closeSearchContainer = () => {
    showSearchContainer.value = false;
}
//search
const search = () => {
    timeout.value ? window.clearTimeout(timeout.value) : console.log(timeout.value, 'timeout');
    timeout.value = setTimeout(async () => {
        const res = await mainStore.searchLocation(searchInput.value);
        console.log(res)
        searchResults.value = res;
    }, 600)
}

const callAddLocation = (e) => {
    console.log(e);
    mainStore.test(e);

}
//smoother transition from list to location

const handleView = (e, data) => {
    smoothTransition(e);
    setTimeout(() => {
        console.log(data)
        emits('view', data);
    }, 380)
};

const smoothTransition = (e) => {
    let clone;
    const el = e.target;
    const { top, left, right } = el.getBoundingClientRect();
    clone = el.cloneNode(true);
    console.log(clone)
    clone.style.position = 'fixed';
    clone.style.top = `${top}px`;
    clone.style.left = `${left}px`;
    clone.style.right = `${right}px`;
    clone.style.zIndex = 1000;
    el.parentNode.appendChild(clone);
    const parent = el.parentNode

    requestAnimationFrame(() => {
        clone.style.top = '0px';
        clone.style.left = '0px';
        clone.style.right = '0px';
        clone.style.width = '100%';
        clone.style.height = '100%';
        clone.style.margin = '0px';
        clone.style.borderRadius = '0px';
        clone.style.zIndex = 1000;
        clone.style.transition = 'all 0.350s cubic-bezier(1,.13,.63,1.21)';
        clone.style.background = 'var(--bg)';

    })
}
</script>

<template>
    <div class="min-h-screen bg-black pb-8 pt-8">
        <Transition>
            <div v-if="showSearchContainer"
                class="bg-black/80 fixed h-screen w-full top-0 z-30 pt-56 backdrop-blur-lg duration-150 transition-all overflow-y-scroll">
                <div v-if="searchResults.length > 0" v-for="location in searchResults" class="px-4">
                    <button class="p-2 block w-full text-left" @click="callAddLocation(location)">
                        {{ location.LocalizedName }}
                        <span class="opacity-50">
                            {{ location.AdministrativeArea ? location.AdministrativeArea.LocalizedName : '' }}
                            {{ location.Country.LocalizedName }}
                        </span>
                    </button>
                </div>
            </div>
        </Transition>


        <div id="list-header" class="z-40">
            <div id="sub-header" class="z-50">
                <div id="sub-header-text">Weather</div>
            </div>
            <div id="list-header-title" class="text-3xl font-bold px-4">Weather</div>
            <div class="px-4 py-4">
                <div class="flex w-full rounded-lg items-center bg-gray-700 px-3 py-1">
                    <span class="mr-3 text-xs">🔍</span>
                    <input v-model="searchInput" class="block w-full bg bg-transparent outline-none"
                        placeholder="Search for location" @input="search" @focus="focusSearchInput"
                        @blur="closeSearchContainer" />
                </div>
            </div>
        </div>
        <div id="list-container">
            <div>
                <ListLocationItem v-if="mainStore.geoLocation.isAvailable" :data="mainStore.geoLocation.coords"
                    @click="handleView($event, { locationName: i })" />
                <ListLocationItem v-for="location in locations" :key="location.key" :location="location"
                    @click="handleView($event, location)" />
            </div>



        </div>
    </div>
</template>

<style scoped>
.t {
    background: var(--bg);
}

#sub-header {
    background: rgba(0, 0, 0, 0);
    top: 0;
    padding-top: 20px;
    width: 100%;
    text-align: center;
    position: fixed;
}

#sub-header-text {
    opacity: 0
}

#list-container {
    padding-top: 160px;
    opacity: 0;
}

#list-header {
    width: 100%;
    padding-top: 30px;
    background: rgba(0, 0, 0, .5);
    backdrop-filter: blur(40px);
    position: fixed;
    top: 0px;
    opacity: 0
}

@media (display-mode: standalone) {
    #sub-header {
        top: 40px;
    }

    #list-header {
        padding-top: 80px;
    }

    #list-container {
        padding-top: 220px;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 250ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>