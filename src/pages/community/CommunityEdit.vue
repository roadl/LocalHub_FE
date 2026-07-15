<template>
  <div class="edit-page">
    <h2>게시물 수정</h2>

    <div class="form-group">
      <label> 제목 </label>

      <input v-model="form.title" />
    </div>

    <div class="form-group">
      <label> 카테고리 </label>

      <select v-model="form.category">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label> 내용 </label>

      <textarea v-model="form.content" />
    </div>

    <div class="button-group">
      <button class="cancel-btn" @click="cancel">취소</button>

      <button class="save-btn" @click="openPasswordModal">수정</button>
    </div>
    <div v-if="showPasswordModal" class="modal-overlay" @click.self="closePasswordModal">
      <div class="password-modal">
        <h3>비밀번호 확인</h3>

        <input
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          @keyup.enter="confirmPassword"
        />

        <div class="modal-buttons">
          <button class="cancel-btn" @click="closePasswordModal">취소</button>

          <button class="confirm-btn" @click="confirmPassword">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { CATEGORY_LIST } from '@/constants/category'

import api from '@/api/api'

const route = useRoute()
const router = useRouter()

const post_id = route.params.post_id

const categories = [
  {
    id: 'DEFAULT',
    name: '기본',
  },
  ...CATEGORY_LIST,
]

const form = ref({})

// API
// GET /api/v1/category/{category}/{content_id}
const fetchPost = async () => {
  const response = await api.get(`/api/v1/community/posts/${post_id}`)
  form.value = response.post
}

onMounted(() => {
  fetchPost()
})

const showPasswordModal = ref(false)
const password = ref('')

function openPasswordModal() {
  password.value = ''
  showPasswordModal.value = true
}

function closePasswordModal() {
  showPasswordModal.value = false
}

async function confirmPassword() {
  if (!password.value.trim()) {
    alert('비밀번호를 입력해주세요.')
    return
  }

  update()

  closePasswordModal()

  router.push(`/community/edit/${post.id}`)
}

const validate = () => {
  if (!form.value.title.trim()) {
    alert('제목을 입력해주세요.')

    return false
  }

  if (!form.value.content.trim()) {
    alert('내용을 입력해주세요.')

    return false
  }

  return true
}

const update = async () => {
  console.log('form', form.value)
  if (!validate()) return

  // API 요청
  // PUT /api/v1/community/posts/{post_id}
  const param = {
    title: form.value.title,
    category: form.value.category,
    content: form.value.content,
    password: password.value.trim(),
  }

  await api.put(`/api/v1/community/posts/${post_id}`, JSON.stringify(param))

  router.push(`/community/${post_id}`)
}

const cancel = () => {
  router.push(`/community/${post_id}`)
}
</script>

<style scoped>
.edit-page {
  width: 800px;

  margin: 40px auto;

  padding: 30px;

  background: white;

  border-radius: 8px;
}

.form-group {
  display: flex;

  flex-direction: column;

  gap: 8px;

  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input,
select,
textarea {
  padding: 10px;

  border: 1px solid #dce7f5;

  border-radius: 6px;
}

textarea {
  height: 250px;

  resize: none;
}

.button-group {
  display: flex;

  justify-content: flex-end;

  gap: 10px;
}

.cancel-btn {
  padding: 10px 20px;

  background: white;

  border: 1px solid #dce7f5;

  border-radius: 8px;
}

.save-btn {
  padding: 10px 20px;

  background: #4a90e2;

  color: white;

  border: none;

  border-radius: 8px;
}

.modal-overlay {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}

.password-modal {
  width: 360px;
  padding: 24px;

  background: white;
  border-radius: 12px;
}

.password-modal h3 {
  margin-bottom: 20px;
}

.password-modal input {
  width: 100%;
  padding: 10px 12px;

  border: 1px solid #dce7f5;
  border-radius: 6px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-top: 20px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 18px;
  border-radius: 6px;
}

.cancel-btn {
  background: white;
  border: 1px solid #dce7f5;
}

.confirm-btn {
  background: #4a90e2;
  color: white;
  border: none;
}

@media (max-width: 768px) {
  .password-modal {
    width: calc(100% - 32px);
    margin: 16px;
  }
}

@media (max-width: 768px) {
  .edit-page {
    width: 100%;

    margin: 20px auto;

    padding: 20px 16px;

    border-radius: 6px;
  }

  .edit-page h2 {
    font-size: 20px;

    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  label {
    font-size: 14px;
  }

  input,
  select,
  textarea {
    width: 100%;

    font-size: 16px;

    padding: 12px;
  }

  textarea {
    height: 200px;
  }

  .button-group {
    width: 100%;

    justify-content: center;

    gap: 8px;
  }

  .cancel-btn,
  .save-btn {
    flex: 1;

    padding: 12px 0;
  }
}
</style>
