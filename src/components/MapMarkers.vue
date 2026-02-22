<script setup lang="ts">
import {
	YandexMap,
	YandexMapDefaultFeaturesLayer,
	YandexMapMarker,
	YandexMapDefaultSchemeLayer,
	type YandexMapSettings
} from "vue-yandex-maps";
import {shallowRef} from "vue";
import type {YMap, YMapMarkerProps, LngLat} from "@yandex/ymaps3-types";
import PinIcon from "@/ui/icons/PinIcon.vue";

const {markers, center = [37.617644, 55.755819]} = defineProps<{
	markers: YMapMarkerProps[],
	center?: LngLat
}>();

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);

const ymapSettings: YandexMapSettings = {
	location: {
		center: center,
		zoom: 9,
	},
	theme: "dark"
};


</script>

<template>
<div class="map-markers" v-if="markers.length">
	<yandex-map v-model="map"
	            :settings="ymapSettings"
	            width="100%"
	            height="100%"
	>
		<yandex-map-default-scheme-layer/>
		<yandex-map-default-features-layer />
		<yandex-map-marker v-for="(marker, idx) in markers" :key="idx" :settings="marker" position="top left-center">
			<PinIcon class="map-marker-icon" />
		</yandex-map-marker>
	</yandex-map>
</div>
</template>

<style scoped>

</style>