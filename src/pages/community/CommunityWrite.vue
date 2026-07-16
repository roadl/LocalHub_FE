<template>
  <div class="write-page">
    <h2>글쓰기</h2>

    <div class="form-group">
      <label> 제목 * </label>

      <input v-model="form.title" placeholder="제목 입력" />
    </div>

    <div class="form-group">
      <label> 카테고리 </label>

      <select v-model="form.contentType">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label> 내용 * </label>

      <textarea v-model="form.content" placeholder="내용 입력" />
    </div>

    <div class="form-group">
      <label> 비밀번호 * </label>

      <input v-model="form.pw" type="password" placeholder="비밀번호 입력" />
    </div>

    <div class="button-group">
      <button class="cancel-btn" @click="cancel">취소</button>

      <button class="submit-btn" @click="submit">등록</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { CATEGORY_LIST } from '@/constants/category'

import api from '@/api/api'

const router = useRouter()

const categories = [
  {
    id: 'DEFAULT',
    name: '기본',
    description: '기본 커뮤니티 게시글',
  },
  ...CATEGORY_LIST,
]

const form = reactive({
  title: '',
  contentType: 'DEFAULT',
  content: '',
  pw: '',
})

const validate = () => {
  if (!form.title.trim()) {
    alert('제목을 입력해주세요.')

    return false
  }

  if (!form.content.trim()) {
    alert('내용을 입력해주세요.')

    return false
  }

  if (!form.pw.trim()) {
    alert('비밀번호를 입력해주세요.')

    return false
  }

  if (form.title.length < 2) {
    alert('제목은 2자 이상 입력해주세요.')

    return false
  }

  if (form.content.length < 10) {
    alert('내용은 10자 이상 입력해주세요.')

    return false
  }

  if (form.pw.length < 4) {
    alert('비밀번호는 4자 이상 입력해주세요.')

    return false
  }

  return true
}

const submit = async () => {
  if (!validate()) return

  // API 요청
  const param = {
    title: form.title,
    category: form.contentType,
    content: form.content,
    password: form.pw,
  }

  await api.post('/api/v1/community/posts', param)

  router.push('/community')
}

const cancel = () => {
  router.push('/community')
}
</script>

<style scoped>
.write-page {
  width: 100%;
  max-width: 800px;

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

.submit-btn {
  padding: 10px 20px;

  background: #4a90e2;

  color: white;

  border: none;

  border-radius: 8px;
}

@media (max-width: 768px) {
  .write-page {
    margin: 20px auto;

    padding: 20px 16px;

    border-radius: 6px;
  }

  .write-page h2 {
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
  .submit-btn {
    flex: 1;

    padding: 12px 0;
  }
}
</style>
