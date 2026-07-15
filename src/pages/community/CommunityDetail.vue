<template>
  <div class="detail-page">
    <div class="post-header">
      <h2>
        {{ post.title }}
      </h2>

      <div class="info">
        <span> 작성시간 {{ post.createdTime }} </span>

        <span> 조회 {{ post.view_count }} </span>

        <span> 좋아요 {{ post.like_count }} </span>
      </div>
    </div>

    <div class="content">
      {{ post.content }}
    </div>

    <div class="like-section">
      <button class="like-btn" @click="clickLike">
        <img src="@/assets/images/like.png" alt="좋아요"/>
      </button>

      <span class="like-count">
        {{ post.like_count }}
      </span>
    </div>

    <div class="button-group">
      <button class="edit-btn" @click="openPasswordModal('edit')">수정</button>

      <button class="delete-btn" @click="openPasswordModal('delete')">삭제</button>
    </div>

    <!-- Password Modal -->
    <div v-if="showModal" class="modal-background">
      <div class="modal">
        <h3>비밀번호 확인</h3>

        <input v-model="inputPw" type="password" placeholder="비밀번호 입력" />

        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeModal">취소</button>

          <button class="confirm-btn" @click="confirmPassword">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import api from '@/api/api'

const route = useRoute()
const router = useRouter()

const post_id = route.params.post_id

// API
// GET /api/v1/category/{category}/{content_id}
// const response = await api.get(`/api/v1/category/${category}/${content_id}`)
// const detail1 = response.data

// PUT /api/v1/category/{category}/{content_id}/view
// await api.get(`/api/v1/category/${category}/${content_id}/view`)

const post = ref({
  id: post_id,

  title: '대전 성심당 방문 후기',

  createdTime: '2026-07-14 10:30',

  content: '대전 여행 중 방문한 성심당 후기입니다.',

  view_count: 152,

  like_count: 32,

  pw: '1234',
})

const showModal = ref(false)

const inputPw = ref('')

const actionType = ref('')

const clickLike = async (content_id) => {
  // API
  // PUT /api/v1/category/{category}/{content_id}/like
  // await api.get(`/api/v1/category/${category}/${content_id}/like`)
}

const openPasswordModal = (type) => {
  actionType.value = type

  inputPw.value = ''

  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const confirmPassword = async () => {
  if (inputPw.value !== post.value.pw) {
    alert('비밀번호가 일치하지 않습니다.')

    return
  }

  if (actionType.value === 'edit') {
    router.push(`/community/edit/${post_id}`)
  }

  if (actionType.value === 'delete') {
    await api.delete(`/api/v1/community/posts/${post_id}`)

    router.push('/community')
  }

  closeModal()
}
</script>

<style scoped>
.detail-page {
  width: 800px;

  margin: 40px auto;

  padding: 30px;

  background: white;

  border-radius: 8px;
}

.post-header {
  border-bottom: 1px solid #dce7f5;

  padding-bottom: 20px;
}

.info {
  display: flex;

  gap: 20px;

  margin-top: 15px;

  color: #666;

  font-size: 14px;
}

.content {
  min-height: 300px;

  padding: 30px 0;

  white-space: pre-line;
}

.like-section{

  display:flex;

  flex-direction:column;

  align-items:center;

  gap:8px;

  margin:40px 0;

}

.like-btn{

  width:60px;

  height:60px;

  display:flex;

  justify-content:center;

  align-items:center;

  border:1px solid #000000;

  border-radius:50%;

  background:#87bfff;

  cursor:pointer;

}

.like-btn img{

  width:28px;

  height:28px;

}

.like-btn:hover{

  background:#357ABD;

}

.like-count{

  font-size:14px;

  color:#666;

}

.button-group {
  display: flex;

  justify-content: flex-end;

  gap: 10px;
}

.edit-btn {
  background: white;

  border: 1px solid #dce7f5;

  padding: 10px 20px;

  border-radius: 8px;
}

.delete-btn {
  background: #4a90e2;

  color: white;

  border: none;

  padding: 10px 20px;

  border-radius: 8px;
}

.modal-background {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.3);

  display: flex;

  justify-content: center;

  align-items: center;
}

.modal {
  width: 350px;

  padding: 30px;

  background: white;

  border-radius: 8px;
}

.modal input {
  width: 100%;

  margin: 20px 0;

  padding: 10px;

  border: 1px solid #dce7f5;
}

.modal-buttons {
  display: flex;

  justify-content: flex-end;

  gap: 10px;
}

.cancel-btn {
  background: white;

  border: 1px solid #dce7f5;

  padding: 8px 15px;
}

.confirm-btn {
  background: #4a90e2;

  color: white;

  border: none;

  padding: 8px 15px;
}

@media(max-width:768px){

  .detail-page {

    width:100%;

    margin:20px auto;

    padding:20px 16px;

    border-radius:6px;
  }


  .post-header h2 {

    font-size:20px;

    word-break:break-word;
  }


  .info {

    flex-direction:column;

    gap:8px;

    font-size:13px;
  }


  .content {

    min-height:200px;

    padding:20px 0;

    font-size:14px;

    line-height:1.7;

    word-break:break-word;
  }


  .like-section {

    margin:30px 0;
  }


  .like-btn {

    width:52px;

    height:52px;
  }


  .like-btn img {

    width:24px;

    height:24px;
  }


  .button-group {

    justify-content:center;

    width:100%;

    gap:8px;
  }


  .edit-btn,
  .delete-btn {

    flex:1;

    padding:12px 0;
  }


  .modal {

    width:calc(100% - 40px);

    padding:24px 20px;
  }


  .modal-buttons {

    width:100%;
  }


  .modal-buttons button {

    flex:1;
  }

}
</style>
