<template>
  <div class="chat-input-container">
    <textarea
      ref="inputRef"
      v-model="message"
      class="chat-input"
      placeholder="메시지를 입력하세요..."
      rows="1"
      :disabled="disabled"
      @keydown="handleKeyDown"
      @input="resizeTextarea"
    />

    <button
      class="send-button"
      :disabled="disabled || !message.trim()"
      @click="send"
    >
      ➤
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["send"]);

const message = ref("");
const inputRef = ref(null);

function send() {
  const text = message.value.trim();

  if (!text || props.disabled) return;

  emit("send", text);

  message.value = "";

  nextTick(() => {
    resizeTextarea();
    inputRef.value?.focus();
  });
}

function handleKeyDown(event) {
  // Shift + Enter => 줄바꿈
  if (event.shiftKey && event.key === "Enter") {
    return;
  }

  // Enter => 전송
  if (event.key === "Enter") {
    event.preventDefault();
    send();
  }
}

function resizeTextarea() {
  const textarea = inputRef.value;

  if (!textarea) return;

  textarea.style.height = "auto";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
}

onMounted(() => {
  inputRef.value?.focus();
  resizeTextarea();
});
</script>

<style scoped>
.chat-input-container {
  display: flex;
  align-items: flex-end;
  gap: 10px;

  padding: 12px;

  border-top: 1px solid #e5e5e5;
  background: white;
}

.chat-input {
  flex: 1;

  min-height: 42px;
  max-height: 120px;

  resize: none;
  overflow-y: auto;

  padding: 10px 14px;

  border: 1px solid #ddd;
  border-radius: 20px;

  outline: none;

  font-size: 14px;
  line-height: 1.5;

  font-family: inherit;
}

.chat-input:focus {
  border-color: #4f7cff;
}

.send-button {
  width: 44px;
  height: 44px;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  background: #4f7cff;
  color: white;

  font-size: 18px;

  transition: 0.2s;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.08);
}

.send-button:active:not(:disabled) {
  transform: scale(0.95);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media(max-width:768px){

  .chat-input-container {
    padding: 10px;
    gap: 8px;

    padding-bottom: calc(
      10px + env(safe-area-inset-bottom)
    );
  }


  .chat-input {

    min-height:44px;

    padding:12px 14px;

    font-size:16px;

    border-radius:18px;
  }


  .send-button {

    width:48px;
    height:48px;

    flex-shrink:0;

    font-size:20px;
  }

}
</style>