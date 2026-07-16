<template>
  <div class="chat-window">
    <!-- Header -->
    <div class="chat-header">
      <span class="title">LocalHub ChatBot</span>

      <div class="header-actions">
        <button @click="$emit('clear')" title="대화 초기화">⟳</button>

        <button @click="$emit('close')" title="닫기">✕</button>
      </div>
    </div>

    <!-- Message Area -->
    <div class="chat-body" ref="bodyRef">
      <ChatMessage v-for="message in messages" :key="message.id" :message="message" />

      <!-- Loading Bubble -->
      <div v-if="loading" class="loading-message">
        <div class="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- Input -->
    <ChatInput @send="send" :disabled="loading" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['send', 'close', 'clear'])

const bodyRef = ref(null)

function scrollBottom() {
  nextTick(() => {
    if (!bodyRef.value) return

    bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  })
}

watch(() => props.messages.length, scrollBottom)

watch(() => props.loading, scrollBottom)

function send(message) {
  emit('send', message)
}
</script>

<style scoped>
.chat-window {
  position: fixed;

  right: 24px;
  bottom: 100px;

  width: 380px;
  height: 600px;

  display: flex;
  flex-direction: column;

  background: white;

  border-radius: 18px;

  overflow: hidden;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  animation: popup 0.25s ease;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-header {
  height: 60px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 0 16px;

  background: #4f7cff;

  color: white;
}

.title {
  font-size: 18px;

  font-weight: bold;
}

.header-actions {
  display: flex;

  gap: 8px;
}

.header-actions button {
  width: 34px;

  height: 34px;

  border: none;

  border-radius: 50%;

  cursor: pointer;

  background: white;
}

.chat-body {
  flex: 1;

  overflow-y: auto;

  padding: 16px;

  background: #f5f5f5;
}

.loading-message {
  display: flex;

  justify-content: flex-start;

  margin-top: 8px;
}

.typing {
  display: flex;

  gap: 5px;

  padding: 12px 16px;

  background: white;

  border-radius: 18px;
}

.typing span {
  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: #999;

  animation: typing 0.8s infinite;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0% {
    opacity: 0.3;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-4px);
  }

  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chat-window {
    position: fixed;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100vw;
    height: 100dvh;

    border-radius: 0;

    animation: none;
  }

  .chat-header {
    height: 60px;
    flex-shrink: 0;
  }

  .title {
    font-size: 16px;
  }

  .chat-body {
    flex: 1;

    padding: 12px;

    overflow-y: auto;
  }
}
</style>
