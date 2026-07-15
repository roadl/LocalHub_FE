<template>
  <div class="map-container">
    <div ref="mapElement" class="map"></div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";

import "leaflet/dist/leaflet.css";


// 기본 위치 (대전)
const props = defineProps({
  latitude: {
    type: Number,
    default: 36.3504,
  },

  longitude: {
    type: Number,
    default: 127.3845,
  },

  zoom: {
    type: Number,
    default: 13,
  },
});


const mapElement = ref(null);

let map = null;
let marker = null;


// 지도 생성
const initMap = () => {

  map = L.map(mapElement.value).setView(
    [
      props.latitude,
      props.longitude
    ],
    props.zoom
  );


  // OpenStreetMap Tile
  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; OpenStreetMap contributors',
    }
  ).addTo(map);


  // Marker
  marker = L.marker([
    props.latitude,
    props.longitude
  ])
  .addTo(map)
  .bindPopup(
    "현재 위치"
  )
};


onMounted(() => {

  initMap();

});


onBeforeUnmount(() => {

  if(map){

    map.remove();

    map = null;

  }

});

</script>


<style scoped>

.map-container {

  width:100%;

  height:400px;

}


.map {

  width:100%;

  height:100%;

  border-radius:8px;

}

</style>