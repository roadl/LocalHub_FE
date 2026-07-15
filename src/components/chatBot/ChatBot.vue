<template>
  <div class="chatbot-container">
    <!-- Floating Button -->
    <button class="chat-fab" @click="toggleChat">
      <span v-if="!isOpen">💬</span>
      <span v-else>✕</span>
    </button>

    <!-- Chat Window -->
    <ChatWindow
      v-if="isOpen"
      ref="chatWindowRef"
      :messages="messages"
      :loading="loading"
      @send="handleSend"
      @clear="clearChat"
      @close="closeChat"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ChatWindow from './ChatWindow.vue'
import { sendMessage } from '@/api/chatApi'

const isOpen = ref(false)
const loading = ref(false)
const initialized = ref(false)

const messages = ref([])

const chatWindowRef = ref(null)

function currentTime() {
  return new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function addBotMessage(text) {
  messages.value.push({
    id: Date.now() + Math.random(),
    sender: 'bot',
    text,
    time: currentTime(),
  })
}

function addUserMessage(text) {
  messages.value.push({
    id: Date.now() + Math.random(),
    sender: 'user',
    text,
    time: currentTime(),
  })
}

function toggleChat() {
  isOpen.value = !isOpen.value

  if (isOpen.value && !initialized.value) {
    initialized.value = true

    addBotMessage('안녕하세요.\n무엇을 도와드릴까요?')
  }
}

function closeChat() {
  isOpen.value = false
}

function clearChat() {
  messages.value = []

  addBotMessage('대화가 초기화되었습니다.')
}

async function handleSend(text) {
  if (!text.trim() || loading.value) return

  addUserMessage(text)

  loading.value = true

  try {
    const response = await sendMessage(
      messages.value.map((message) => ({
        sender: message.sender,
        message: message.text,
      })),
    )

    addBotMessage(response.message)
  } catch (e) {
    addBotMessage('죄송합니다.\n잠시 후 다시 시도해주세요.')
  } finally {
    loading.value = false
  }
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
}

.chat-fab {
  position: fixed;
  right: 24px;
  bottom: 24px;

  width: 64px;
  height: 64px;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  font-size: 26px;

  background: #4f7cff;
  color: white;

  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);

  transition: 0.25s;
}

.chat-fab:hover {
  transform: scale(1.08);
}

.chat-fab:active {
  transform: scale(0.95);
}

/* 모바일 */
@media (max-width: 768px) {
  .chat-fab {
    right: 16px;
    bottom: 16px;

    width: 56px;
    height: 56px;

    font-size: 22px;
  }
}

/*
  ChatWindow가 열렸을 때
  부모 영역 전체 사용
*/
@media (max-width: 768px) {
  .chatbot-container:has(.chat-window) {
    width: 100vw;
    height: 100vh;

    right: 0;
    bottom: 0;
  }
}
</style>
