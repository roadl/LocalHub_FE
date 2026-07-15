<template>
  <section class="community-section">
    <div class="community-header">
      <h2>Community</h2>

      <div class="search-box">
        <select v-if="showCategorySelect" v-model="selectedCategory">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <input v-model="searchKeyword" placeholder="Search" />

        <button>🔍</button>
      </div>
    </div>

    <table class="community-table">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>조회수</th>
          <th>좋아요</th>
          <th>작성시간</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(post, index) in displayPosts" :key="post.id" @click="movePost(post.id)">
          <td>{{ (currentPage - 1) * props.pageSize + index + 1 }}</td>

          <td class="title">{{ post.title }}</td>

          <td>{{ post.view_count }}</td>

          <td>{{ post.like_count }}</td>

          <td>{{ post.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Footer -->
    <div class="community-footer">
      <!-- Pagination -->
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

      <!-- Write -->
      <button class="write-btn" @click="moveWrite">글쓰기</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { CATEGORY_LIST_ALL } from '@/constants/category'
import api from '@/api/api'

const categories = CATEGORY_LIST_ALL

const props = defineProps({
  pageSize: {
    type: Number,
    default: 10,
  },
  inputCategory: {
    type: String,
    default: 'DEFAULT',
  },
  showCategorySelect: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()

const currentPage = ref(1)

const selectedCategory = ref(props.inputCategory)
const searchKeyword = ref('')

const posts = ref([])

// API 요청
const fetchItems = async () => {
  const response = await api.get(`/api/v1/community/posts/list/${selectedCategory.value}`)
  posts.value = response.posts
}

onMounted(() => {
  fetchItems()
})

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const categoryMatch =
      selectedCategory.value === 'DEFAULT' || post.category === selectedCategory.value

    const keywordMatch =
      searchKeyword.value.trim() === '' ||
      post.title.toLowerCase().includes(searchKeyword.value.toLowerCase())

    return categoryMatch && keywordMatch
  })
})

const totalPage = computed(() => {
  return Math.ceil(filteredPosts.value.length / props.pageSize)
})

const displayPosts = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize

  return filteredPosts.value.slice(start, start + props.pageSize)
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
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++
  }
}

const movePost = (id) => {
  router.push(`/community/${id}`)
}

const moveWrite = () => {
  router.push('/community/write')
}

watch([selectedCategory, searchKeyword], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.community-section {
  margin-bottom: 40px;
}

.community-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
}

.search-box {
  display: flex;

  border: 1px solid #dce7f5;

  border-radius: 8px;

  overflow: hidden;
}

.search-box input {
  width: 200px;

  padding: 8px 12px;

  border: none;

  outline: none;

  margin-left: 8px;
}

.search-box button {
  width: 40px;

  border: none;

  background: white;
}

.community-table {
  width: 100%;

  border-collapse: collapse;

  background: white;
}

.community-table th {
  padding: 12px;

  border-bottom: 1px solid #dce7f5;
}

.community-table td {
  padding: 12px;

  border-bottom: 1px solid #eeeeee;

  text-align: center;
}

.community-table tr:hover {
  background: #f5faff;

  cursor: pointer;
}

.title {
  text-align: left;
}

.write-btn:hover {
  background: #357abd;
}

.community-footer {
  position: relative;

  display: flex;

  justify-content: center;

  align-items: center;

  margin-top: 20px;
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
}

.pagination button.active {
  background: #4a90e2;

  color: white;
}

.write-btn {
  position: absolute;

  right: 0;

  padding: 10px 20px;

  background: #4a90e2;

  color: white;

  border: none;

  border-radius: 8px;
}

@media (max-width: 768px) {
  .community-section {
    margin-bottom: 30px;
  }

  .community-header {
    flex-direction: column;

    align-items: stretch;

    gap: 15px;

    margin-bottom: 15px;
  }

  .community-header h2 {
    font-size: 22px;
  }

  .search-box {
    width: 100%;
  }

  .search-box select {
    flex: 0 0 90px;
  }

  .search-box input {
    width: 100%;

    margin-left: 0;

    padding: 10px;
  }

  .search-box button {
    width: 45px;
  }

  /*
    테이블 모바일 대응
  */
  .community-table {
    display: block;

    overflow-x: auto;

    white-space: nowrap;
  }

  .community-table th,
  .community-table td {
    padding: 10px 12px;

    font-size: 13px;
  }

  .community-table th:nth-child(1),
  .community-table td:nth-child(1) {
    width: 50px;
  }

  .community-table th:nth-child(2),
  .community-table td:nth-child(2) {
    min-width: 180px;
  }

  .community-table th:nth-child(5),
  .community-table td:nth-child(5) {
    min-width: 100px;
  }

  .community-footer {
    margin-top: 15px;

    flex-direction: column;

    gap: 15px;
  }

  .pagination {
    gap: 4px;
  }

  .pagination button {
    min-width: 32px;

    height: 32px;

    font-size: 12px;
  }

  .write-btn {
    position: static;

    width: 100%;

    padding: 12px;
  }
}
</style>
