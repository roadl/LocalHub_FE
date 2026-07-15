<template>
  <div class="community-page">
    <CommunityBoard :pageSize="50" />
  </div>
</template>

<script setup>
import CommunityBoard from '@/components/community/CommunityBoard.vue'
</script>

<style scoped>
.community-page {
  width: 100%;
  max-width: 1200px;

  margin: 40px auto;
  padding: 0 24px;
}


/* 모바일 */
@media(max-width:768px){

  .community-page {

    margin:20px auto;

    padding:0 16px;
  }

}


/* 작은 모바일 */
@media(max-width:480px){

  .community-page {

    margin:16px auto;

    padding:0 12px;
  }

}
</style>