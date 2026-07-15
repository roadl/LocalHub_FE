<template>
  <div class="edit-page">
    <h2>게시물 수정</h2>

    <div class="form-group">
      <label> 제목 </label>

      <input v-model="form.title" />
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
      <label> 내용 </label>

      <textarea v-model="form.content" />
    </div>

    <div class="button-group">
      <button class="cancel-btn" @click="cancel">취소</button>

      <button class="save-btn" @click="update">수정</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
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

// API 요청
// const response = api.get(`/api/v1/community/posts/${post_id}`)
// const form = reactive(response.data)

const form = reactive({
  title: '대전 성심당 방문 후기',

  contentType: 'TOURISM',

  content: '대전 여행 중 방문한 성심당 후기입니다.',
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

  return true
}

const update = async () => {
  if (!validate()) return

  // API 요청
  // PUT /api/v1/community/posts/{post_id}
  const param = {
    title: form.title,
    category: form.contentType,
    content: form.content,
    password: form.password,
  }

  await api.put(`/api/v1/community/posts/${post_id}`, param)

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

@media(max-width:768px){

  .edit-page {

    width:100%;

    margin:20px auto;

    padding:20px 16px;

    border-radius:6px;
  }


  .edit-page h2 {

    font-size:20px;

    margin-bottom:20px;
  }


  .form-group {

    margin-bottom:16px;
  }


  label {

    font-size:14px;
  }


  input,
  select,
  textarea {

    width:100%;

    font-size:16px;

    padding:12px;
  }


  textarea {

    height:200px;
  }


  .button-group {

    width:100%;

    justify-content:center;

    gap:8px;
  }


  .cancel-btn,
  .save-btn {

    flex:1;

    padding:12px 0;
  }

}
</style>
