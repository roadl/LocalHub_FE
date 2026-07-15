<template>
  <div class="detail-page">
    <h2>{{ detail.title }}</h2>

    <div class="image-section">
      <img :src="detail.image_url" alt="대표 이미지" />

      <PlaceMap />
    </div>

    <table class="detail-table">
      <tbody>
        <tr>
          <th>주소</th>
          <td>{{ detail.address }}</td>
        </tr>

        <tr>
          <th>상세주소</th>
          <td>{{ detail.addr2 }}</td>
        </tr>

        <tr>
          <th>전화번호</th>
          <td>{{ detail.phone }}</td>
        </tr>

        <tr>
          <th>위도(MapY)</th>
          <td>{{ detail.mapy }}</td>
        </tr>

        <tr>
          <th>경도(MapX)</th>
          <td>{{ detail.mapx }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { CATEGORY_DATA } from '@/constants/data'

import PlaceMap from '@/components/map/PlaceMap.vue'
import api from '@/api/api'

const route = useRoute()

const category = route.params.category
const content_id = route.params.content_id

// 예시 데이터
const detail = CATEGORY_DATA[category].data[content_id]
</script>

<style scoped>
.detail-page {
  width: 100%;
  max-width: 1000px;

  margin: 40px auto;
}

/* Image */

.image-section {
  display: flex;

  gap: 20px;

  margin: 30px 0;
}

.image-section img {
  width: 400px;

  height: 280px;

  object-fit: cover;

  border-radius: 8px;
}

/* Table */

.detail-table {
  width: 100%;

  border-collapse: collapse;
}

.detail-table th {
  width: 180px;

  padding: 12px;

  background: #eaf4ff;

  border: 1px solid #dce7f5;
}

.detail-table td {
  padding: 12px;

  border: 1px solid #dce7f5;
}

/* Tablet */

@media (max-width: 1024px) {
  .detail-page {
    padding: 0 20px;
  }

  .image-section img {
    width: 50%;
  }
}

/* Mobile */

@media (max-width: 768px) {
  .detail-page {
    margin: 20px auto;

    padding: 0 16px;
  }

  .detail-page h2 {
    font-size: 22px;
  }

  .image-section {
    flex-direction: column;

    gap: 12px;

    margin: 20px 0;
  }

  .image-section img {
    width: 100%;

    height: auto;

    aspect-ratio: 4 / 3;
  }

  .detail-table {
    font-size: 14px;
  }

  .detail-table th {
    width: 90px;

    padding: 10px 8px;

    font-size: 13px;
  }

  .detail-table td {
    padding: 10px;

    word-break: break-word;
  }
}

/* Small Mobile */

@media (max-width: 480px) {
  .detail-page {
    padding: 0 12px;
  }

  .detail-page h2 {
    font-size: 20px;
  }

  .detail-table th {
    width: 75px;

    font-size: 12px;
  }

  .detail-table td {
    font-size: 13px;
  }
}
</style>
