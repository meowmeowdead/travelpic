<script setup lang="ts">
import {
	YandexMap,
	YandexMapDefaultFeaturesLayer,
	YandexMapMarker,
	YandexMapDefaultSchemeLayer,
	YandexMapListener, type YandexMapSettings
} from "vue-yandex-maps";
import {shallowRef} from "vue";
import type {DomEventHandler, YMap, YMapMarkerProps} from "@yandex/ymaps3-types";
import PinIcon from "@/ui/icons/PinIcon.vue";

const marker = defineModel<YMapMarkerProps | null>({default: null});

//Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);

const ymapSettings: YandexMapSettings = {
	location: {
		center: marker.value ? marker.value.coordinates : [37.617644, 55.755819],
		zoom: 9,
	},
	theme: "dark"
};

const logMapClick: DomEventHandler = (object, event) => {
	if(object === undefined) {
		updateMarkerHandler(event.coordinates);
	}
};

const updateMarkerHandler = (coords: YMapMarkerProps['coordinates']): void => {
	marker.value = {
		coordinates: coords,
	};
}


</script>

<template>
<div class="map-mark-setter">
	<yandex-map v-model="map"
	            :settings="ymapSettings"
	            width="100%"
	            height="300px"
	>
		<yandex-map-default-scheme-layer/>
		<yandex-map-default-features-layer />
		<yandex-map-listener :settings="{ onClick: logMapClick }" />
		<template v-if="marker">
			<yandex-map-marker :settings="marker" position="top left-center">
				<PinIcon class="map-marker-icon" />
			</yandex-map-marker>
		</template>
	</yandex-map>
</div>
</template>

<style scoped>

</style>