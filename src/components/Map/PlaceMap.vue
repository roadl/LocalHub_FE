<template>
  <div class="map-container">
    <div ref="mapElement" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

const props = defineProps({
  lat: {
    type: Number,
    default: 36.3504,
  },
  lon: {
    type: Number,
    default: 127.3845,
  },
  zoom: {
    type: Number,
    default: 13,
  },
})

const mapElement = ref(null)

let map = null
let marker = null

const initMap = () => {
  map = L.map(mapElement.value).setView([props.lat, props.lon], props.zoom)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  marker = L.marker([props.lat, props.lon]).addTo(map)
}

watch(
  () => [props.lat, props.lon, props.zoom],
  ([lat, lon, zoom]) => {
    if (!map || !marker) return

    map.setView([lat, lon], zoom)
    marker.setLatLng([lat, lon])
  },
)

onMounted(initMap)

onBeforeUnmount(() => {
  map?.remove()
})
</script>

<style scoped>
.map-container {
  width: 100%;

  height: 400px;
}

.map {
  width: 100%;

  height: 100%;

  border-radius: 8px;
}
</style>
