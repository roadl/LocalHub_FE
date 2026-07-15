<template>
  <footer class="footer">

    <div class="container">

      <section class="left">
        <img src="@/assets/images/ssafy_logo.png" alt="logo">
      </section>

      <section class="center">

        <h3>{{ siteInfo.projectName }}</h3>

        <p>
          {{ siteInfo.description }}
        </p>

      </section>

      <section class="right">

        <h3>{{ siteInfo.team }}</h3>

        <p
          v-for="member in siteInfo.members"
          :key="member"
        >
          {{ member }}
        </p>

      </section>

    </div>

  </footer>
</template>

<script setup>
import { siteInfo } from "@/constants/siteInfo";
</script>

<style scoped>

.footer {
  background:white;
  border-top:1px solid #c7ccd3;
  margin-top:60px;
}


.container {
  width:100%;
  max-width:1200px;

  margin:auto;
  padding:40px 24px;

  display:grid;
  grid-template-columns:1fr 2fr 1fr;
  gap:50px;

  align-items:center;
}


.left img {
  width:150px;
}


.center h3,
.right h3 {
  margin-bottom:12px;
}


.center p,
.right p {
  color:#666;
  line-height:1.7;
}


/* 모바일 */
@media(max-width:768px){

  .footer {
    margin-top:40px;
  }


  .container {

    padding:30px 16px;

    display:flex;
    flex-direction:column;

    gap:25px;

    text-align:center;
  }


  .left img {
    width:120px;
    margin:auto;
  }


  .center h3,
  .right h3 {
    font-size:16px;
  }


  .center p,
  .right p {
    font-size:14px;
  }

}


/* 작은 모바일 */
@media(max-width:480px){

  .container {
    padding:25px 12px;
  }

  .center p,
  .right p {
    font-size:13px;
  }

}

</style>