<!-- src/pages/Home.vue -->

<template>
  <div class="home">
    <!-- Banner -->
    <section class="banner">
      <h1>LocalHub</h1>
      <p>공공데이터 기반 지역 정보 공유 커뮤니티</p>
      <!--img src="@/assets/images/banner.jpg" alt="banner" /-->
    </section>

    <!-- Category -->
    <section class="category-section">
      <h2>Category</h2>

      <div class="category-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          @click="moveCategory(category.id)"
        >
          <h3>
            {{ category.name }}
          </h3>

          <p>
            {{ category.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Community -->
    <CommunityBoard :pageSize="5" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import CommunityBoard from '@/components/community/CommunityBoard.vue'

import { CATEGORY_LIST } from '@/constants/category'

const router = useRouter()

const categories = CATEGORY_LIST

const moveCategory = (categoryId) => {
  router.push(`/category/${categoryId}`)
}
</script>

<style scoped>
.home {
  width: 100%;
}

/* Banner */

.banner {
  padding: 60px;

  background: #d2e4f8;

  border-radius: 8px;

  margin-bottom: 40px;
}

/* Category */

.category-section {
  margin-bottom: 40px;
}

.category-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 20px;

  margin-top: 20px;
}

.category-item {
  min-height: 120px;

  padding: 25px;

  background: white;

  border: 1px solid #dce7f5;

  border-radius: 8px;

  cursor: pointer;
}

.category-item:hover {
  background: #eaf4ff;
}

.category-item h3 {
  margin-bottom: 10px;
}

.category-item p {
  font-size: 14px;

  color: #666;
}

/* Community */

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
}

.search-box button {
  width: 40px;

  border: none;

  background: white;

  cursor: pointer;
}

.community-table {
  width: 100%;

  border-collapse: collapse;

  background: white;
}

.community-table th {
  padding: 12px;

  border-bottom: 1px solid #dce7f5;

  font-size: 14px;
}

.community-table td {
  padding: 12px;

  border-bottom: 1px solid #eeeeee;

  font-size: 14px;

  text-align: center;
}

.community-table tr:hover {
  background: #f5faff;

  cursor: pointer;
}

.title {
  text-align: left;
}

.community-footer {
  display: flex;

  justify-content: flex-end;

  margin-top: 20px;
}

.write-btn {
  padding: 10px 20px;

  background: #4a90e2;

  color: white;

  border: none;

  border-radius: 8px;
}

.write-btn:hover {
  background: #357abd;
}

@media(max-width:1024px){

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


/* 모바일 */
@media(max-width:768px){

  .banner {

    padding:30px 20px;

    margin-bottom:25px;

    text-align:center;
  }


  .banner h1 {
    font-size:28px;
  }


  .banner p {
    margin-top:10px;

    font-size:14px;
  }


  .category-section {
    margin-bottom:30px;
  }


  .category-section h2 {
    font-size:22px;
  }


  .category-grid {

    grid-template-columns:1fr;

    gap:12px;

    margin-top:15px;
  }


  .category-item {

    min-height:auto;

    padding:20px;
  }


  .category-item h3 {

    font-size:17px;

    margin-bottom:8px;
  }


  .category-item p {

    font-size:13px;

  }

}


/* 작은 모바일 */
@media(max-width:480px){

  .banner {

    padding:25px 15px;

    border-radius:6px;
  }


  .banner h1 {

    font-size:24px;
  }


  .category-item {

    padding:16px;
  }

}
</style>
