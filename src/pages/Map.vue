<template>
  <div class="map-page">
    <!-- Control -->
    <div class="map-control">
      <div class="search-box">
        <input v-model="searchKeyword" placeholder="장소 검색" @keyup.enter="search" />

        <button @click="search">🔍</button>
      </div>

      <div class="category-toggle">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="{
            active: selectedCategories.includes(category.id),
          }"
          @click="toggleCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div ref="mapElement" class="map" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import { CATEGORY_DATA } from '@/constants/tempData'

// =====================
// Icon
// =====================

const createIcon = (name) => {
  return L.icon({
    iconUrl: `/${name}.png`,

    iconSize: [35, 35],

    iconAnchor: [17, 35],
  })
}

const categoryIcons = {
  TOURISM: createIcon('marker'),

  LEISURE: createIcon('marker'),

  CULTURAL_FACILITY: createIcon('marker'),

  SHOPPING: createIcon('marker'),

  ACCOMMODATION: createIcon('marker'),

  TRAVEL_COURSE: createIcon('marker'),

  RESTAURANT: createIcon('marker'),

  FESTIVAL: createIcon('marker'),
}

// =====================
// Category
// =====================

const categories = Object.keys(CATEGORY_DATA).map((id) => ({
  id,

  name: CATEGORY_DATA[id].contentType,
}))

const selectedCategories = ref(categories.map((item) => item.id))

// =====================
// Data
// =====================

const places = Object.entries(CATEGORY_DATA).flatMap(([category, data]) => {
  return data.items.map((item) => ({
    category,

    title: item.title,

    address: item.addr1,

    lat: Number(item.mapy),

    lng: Number(item.mapx),

    image: item.firstimage,
  }))
})

// =====================
// Map
// =====================

const mapElement = ref(null)

let map = null

const markers = {}

const searchKeyword = ref('')

// =====================
// Marker
// =====================

const renderMarkers = () => {
  // 기존 제거

  Object.values(markers)
    .flat()
    .forEach((marker) => {
      marker.remove()
    })

  Object.keys(CATEGORY_DATA).forEach((category) => {
    markers[category] = []
  })

  places
    .filter((place) => {
      const keyword = searchKeyword.value.trim()

      if (keyword === '') return true

      return place.title.includes(keyword)
    })
    .forEach((place) => {
      const marker = L.marker([place.lat, place.lng], {
        icon: categoryIcons[place.category],
      })
        .bindPopup(
          `
      <div>
        <h3>${place.title}</h3>
        <img src=${place.image ? place.image : '/default.png'} alt="대표 이미지" />
        <p>${place.address}</p>
      </div>
      `,
          {
            offset: [0, -30],
          },
        )
        .on('click', () => {
          const currentZoom = map.getZoom()

          const targetZoom = currentZoom < 15 ? 15 : currentZoom

          map.setView([place.lat, place.lng], targetZoom, {
            animate: true,
            duration: 1.0,
          })
        })

      markers[place.category].push(marker)

      if (selectedCategories.value.includes(place.category)) {
        marker.addTo(map)
      }
    })
}

// =====================
// Toggle
// =====================

const toggleCategory = (category) => {
  const active = selectedCategories.value.includes(category)

  if (active) {
    selectedCategories.value = selectedCategories.value.filter((item) => item !== category)

    markers[category]?.forEach((marker) => {
      marker.remove()
    })
  } else {
    selectedCategories.value.push(category)

    markers[category]?.forEach((marker) => {
      marker.addTo(map)
    })
  }
}

// =====================
// Search
// =====================

const search = () => {
  renderMarkers()
}

// =====================
// Init
// =====================

const initMap = () => {
  map = L.map(mapElement.value).setView(
    [36.3504, 127.3845],

    13,
  )

  L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',

    {
      attribution: '&copy; OpenStreetMap',
    },
  ).addTo(map)

  renderMarkers()
}

onMounted(() => {
  initMap()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.map-page {
  position: relative;

  width: 100%;

  height: calc(100vh - 80px);
}

.map {
  width: 100%;

  height: 100%;
}

/* Control */

.map-control {
  position: absolute;

  top: 20px;

  right: 20px;

  z-index: 1000;

  display: flex;

  gap: 10px;

  align-items: center;
}

.search-box {
  display: flex;

  background: white;

  border-radius: 8px;

  overflow: hidden;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.search-box input {
  width: 220px;

  padding: 10px;

  border: none;

  outline: none;
}

.search-box button {
  width: 45px;

  border: none;

  background: white;

  cursor: pointer;
}

.category-toggle {
  display: flex;

  gap: 5px;

  padding: 8px;

  background: white;

  border-radius: 8px;

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.category-toggle button {
  padding: 8px 12px;

  border: none;

  border-radius: 6px;

  background: #eee;

  cursor: pointer;
}

.category-toggle button.active {
  background: #4a90e2;

  color: white;
}

/* Mobile */

@media (max-width: 768px) {
  .map-page {
    height: calc(100vh - 60px);
  }

  .map-control {
    top: 15px;

    left: 15px;

    right: 15px;

    flex-direction: column;

    align-items: stretch;
  }

  .search-box input {
    width: 100%;
  }

  .category-toggle {
    flex-wrap: wrap;

    justify-content: center;
  }

  .category-toggle button {
    flex: 1;

    min-width: 80px;
  }
}
</style>
