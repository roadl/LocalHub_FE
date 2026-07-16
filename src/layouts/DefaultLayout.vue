<template>
  <div class="layout">
    <Header />

    <main class="content">
      <router-view />
    </main>

    <Footer />

    <ChatBot />
  </div>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import ChatBot from '@/components/chatBot/ChatBot.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #e8fbff;
}

.content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 24px;
}

/* 모바일 */
@media (max-width: 768px) {
  .content {
    margin: 20px auto;
    padding: 0 16px;
  }
}

/* 작은 모바일 */
@media (max-width: 480px) {
  .content {
    margin: 16px auto;
    padding: 0 12px;
  }
}
</style>
