<template>
  <div
    class="message-wrapper"
    :class="message.sender === 'user' ? 'user-wrapper' : 'bot-wrapper'"
  >
    <div
      class="message-bubble"
      :class="message.sender === 'user' ? 'user-bubble' : 'bot-bubble'"
    >
      <div class="message-text">
        {{ message.text }}
      </div>

      <div class="message-time">
        {{ message.time }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.message-wrapper {
  display: flex;
  width: 100%;
  margin-bottom: 12px;

  animation: fadeIn 0.25s ease;
}

.user-wrapper {
  justify-content: flex-end;
}

.bot-wrapper {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 18px;

  word-break: break-word;
  white-space: pre-wrap;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.user-bubble {
  background: #4f7cff;
  color: white;

  border-bottom-right-radius: 6px;
}

.bot-bubble {
  background: rgb(218, 255, 255);
  color: #333;

  border-bottom-left-radius: 6px;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
}

.message-time {
  margin-top: 6px;

  font-size: 11px;
  opacity: 0.7;
  text-align: right;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media(max-width:768px){

  .message-wrapper {
    margin-bottom:10px;
  }


  .message-bubble {

    max-width:85%;

    padding:10px 14px;

    border-radius:16px;
  }


  .message-text {

    font-size:15px;

    line-height:1.6;
  }


  .message-time {

    font-size:10px;

    margin-top:4px;
  }

}
</style>