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
import { useRouter } from 'vue-router'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import api from '@/api/api'

import { CATEGORY_LIST } from '@/constants/category'

// =====================
// Router
// =====================

const router = useRouter()

function moveCategory(item) {
  router.push(`/category/${item.category}/${item.contentid}`)
}

// =====================
// Icon
// =====================

const createIcon = (name) => {
  return L.icon({
    iconUrl: `/icons/${name}.png`,

    iconSize: [35, 45],

    iconAnchor: [17, 35],
  })
}

const categoryIcons = {
  TOURISM: createIcon('TOURISM'),

  LEISURE: createIcon('LEISURE'),

  CULTURAL_FACILITY: createIcon('CULTURAL_FACILITY'),

  SHOPPING: createIcon('SHOPPING'),

  ACCOMMODATION: createIcon('ACCOMMODATION'),

  TRAVEL_COURSE: createIcon('TRAVEL_COURSE'),

  RESTAURANT: createIcon('RESTAURANT'),

  FESTIVAL: createIcon('FESTIVAL'),
}

// =====================
// Category
// =====================

const categories = CATEGORY_LIST.map((item) => ({
  id: item.id,

  name: item.name,
}))

const selectedCategories = ref(categories.map((item) => item.id))

// =====================
// Data
// =====================

// CATEGORY_DATA[category] 형태로 접근 가능
const CATEGORY_DATA = ref({})

// 지도 마커 렌더에 사용하는 평탄화된 목록
const places = ref([])

const buildPlaces = () => {
  places.value = Object.entries(CATEGORY_DATA.value).flatMap(([category, items]) => {
    return items.map((item) => ({
      category,

      title: item.title,

      address: item.address,

      lat: Number(item.mapy),

      lng: Number(item.mapx),

      image: item.image_url,

      contentid: item.content_id,
    }))
  })
}

// 카테고리별 API 병렬 요청
const fetchCategoryData = async () => {
  const results = await Promise.all(
    CATEGORY_LIST.map(async ({ id }) => {
      try {
        const res = await api.get(`/api/v1/location/${id}`)

        // 응답이 items 배열이라고 가정. 감싸져 있다면 res.data.items 등으로 수정
        return { id, items: res.items ?? [] }
      } catch (error) {
        console.error(`[${id}] 카테고리 데이터 로드 실패`, error)

        return { id, items: [] }
      }
    }),
  )

  CATEGORY_DATA.value = results.reduce((acc, { id, items }) => {
    acc[id] = items

    return acc
  }, {})

  buildPlaces()
}

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

  CATEGORY_LIST.forEach(({ id }) => {
    markers[id] = []
  })

  places.value
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
        <img class="popup-image" src=${place.image ? place.image : '/default.png'} alt="대표 이미지" />
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
        .on('popupopen', (e) => {
          const image = e.popup.getElement()?.querySelector('.popup-image')

          if (!image) return

          image.style.cursor = 'pointer'

          image.onclick = () => {
            moveCategory(place)
          }
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

onMounted(async () => {
  await fetchCategoryData()

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
