<template>
  <div class="category-page">
    <div class="category-header">
      <h2>{{ categoryDetail.name }} - {{ categoryDetail.description }}</h2>

      <input v-model="searchKeyword" placeholder="관광지 검색" />
    </div>

    <div class="card-grid">
      <div
        class="category-card"
        v-for="item in displayItems"
        :key="item.content_id"
        @click="moveDetail(item.content_id)"
      >
        <div class="card-image">
          <img :src="item.image_url || defaultImage" :alt="item.title" />
        </div>

        <div class="card-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.address }}</p>
        </div>
      </div>
    </div>

    <div class="category-footer">
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1"><</button>

        <button
          v-for="page in pages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>

        <button @click="nextPage" :disabled="currentPage === totalPage">></button>
      </div>
    </div>

    <!-- Community -->
    <CommunityBoard
      :key="category"
      :pageSize="5"
      :inputCategory="category"
      :showCategorySelect="false"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { CATEGORY_LIST } from '@/constants/category'
import defaultImage from '@/assets/images/default.png'
import api from '@/api/api'

import CommunityBoard from '@/components/community/CommunityBoard.vue'

const route = useRoute()
const router = useRouter()

const category = computed(() => route.params.category)

const categoryDetail = computed(() => {
  return CATEGORY_LIST.find((item) => item.id === category.value)
})

const categoryData = ref([])

const currentPage = ref(1)

const searchKeyword = ref('')

const pageSize = 12

const fetchCategoryData = async () => {
  const locations = await api.get(`/api/v1/location/${category.value}`)

  categoryData.value = locations.items

  currentPage.value = 1
}

onMounted(() => {
  fetchCategoryData()
})

const filteredItems = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  return categoryData.value.filter((item) => {
    if (keyword === '') return true

    return (
      item.title.toLowerCase().includes(keyword) || item.address.toLowerCase().includes(keyword)
    )
  })
})

const totalPage = computed(() => {
  return Math.ceil(filteredItems.value.length / pageSize)
})

const displayItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize

  return filteredItems.value.slice(start, start + pageSize)
})

const pages = computed(() => {
  const size = 10

  const start = Math.floor((currentPage.value - 1) / size) * size + 1

  const end = Math.min(start + size - 1, totalPage.value)

  return Array.from(
    {
      length: end - start + 1,
    },
    (_, i) => start + i,
  )
})

const changePage = (page) => {
  currentPage.value = page
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPage.value) currentPage.value++
}

const moveDetail = (contentId) => {
  router.push(`/category/${category.value}/${contentId}`)
}

watch(searchKeyword, () => {
  currentPage.value = 1
})

watch(
  () => route.params.category,
  async () => {
    searchKeyword.value = ''

    await fetchCategoryData()
  },
)
</script>

<style scoped>
.category-page {
  width: 100%;
  max-width: 1200px;

  margin: 40px auto;
}

.category-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.category-header input {
  width: 300px;

  padding: 10px;

  border: 1px solid #dce7f5;

  border-radius: 6px;
}

/* Card Grid */

.card-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 20px;
}

.category-card {
  background: white;

  border-radius: 12px;

  overflow: hidden;

  border: 1px solid #dce7f5;

  cursor: pointer;

  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 180px;
}

@media (max-width: 768px) {
  .card-image {
    height: 150px;
  }
}

.card-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.card-content h3 {
  margin: 0 0 10px;

  font-size: 18px;
}

.card-content p {
  margin: 0;

  color: #666;

  font-size: 14px;
}

/* Pagination */

.category-footer {
  display: flex;

  justify-content: center;

  margin-top: 30px;
}

.pagination {
  display: flex;

  gap: 6px;
}

.pagination button {
  min-width: 36px;

  height: 36px;

  border: 1px solid #dce7f5;

  background: white;

  border-radius: 6px;

  cursor: pointer;
}

.pagination button.active {
  background: #4a90e2;

  color: white;
}

.pagination button:disabled {
  opacity: 0.5;

  cursor: default;
}

/* Responsive */

@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-header {
    flex-direction: column;

    gap: 10px;

    align-items: stretch;
  }

  .category-header h2 {
    font-size: 20px;
  }

  .category-header input {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: 3px;
  }

  .pagination button {
    min-width: 30px;

    height: 30px;

    font-size: 12px;
  }
}
</style>
