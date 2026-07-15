<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/" class="logo">
        <img src="@/assets/images/logo.png" alt="logo" />
      </RouterLink>

      <button class="menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">☰</button>

      <nav :class="{ open: mobileMenuOpen }">
        <RouterLink to="/" @click="closeMenu"> Home </RouterLink>

        <RouterLink to="/map" @click="closeMenu"> Map </RouterLink>

        <!-- Category -->
        <div class="dropdown">
          <span>Category</span>

          <ul class="dropdown-menu">
            <li v-for="item in categories" :key="item.id">
              <RouterLink :to="`/category/${item.id}`" @click="closeMenu">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Community -->
        <div class="dropdown">
          <span>Community</span>

          <ul class="dropdown-menu">
            <li>
              <RouterLink to="/community" @click="closeMenu"> 게시판 </RouterLink>
            </li>

            <li>
              <RouterLink to="/community/write" @click="closeMenu"> 글쓰기 </RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

import { CATEGORY_LIST } from '@/constants/category.js'

const categories = CATEGORY_LIST

const mobileMenuOpen = ref(false)

const closeMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: sticky;

  top: 0;

  z-index: 9999;

  background: white;

  border-bottom: 1px solid #c7ccd3;
}

.container {
  width: 100%;

  max-width: 1200px;

  height: 80px;

  margin: auto;

  padding: 0 20px;

  display: flex;

  justify-content: space-between;

  align-items: center;
}

.logo img {
  width: 150px;
}

nav {
  display: flex;

  gap: 40px;

  align-items: center;
}

nav > a,
.dropdown > span {
  color: #333;

  font-weight: 600;

  cursor: pointer;
}

.dropdown {
  position: relative;
}

/* Dropdown */

.dropdown-menu {
  position: absolute;

  top: 100%; /* 기존 40px 제거 */
  left: 50%;

  transform: translateX(-50%);

  width: 180px;

  background: white;

  border: 1px solid #c7ccd3;
  border-radius: 8px;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  overflow: hidden;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transition: 0.2s;
}

.dropdown-menu li {
  list-style: none;
}

.dropdown-menu a {
  display: block;

  padding: 12px 18px;

  color: #333;
}

.dropdown-menu a:hover {
  background: #eaf4ff;

  color: #4a90e2;
}

/* PC Hover */

@media (min-width: 769px) {
  .dropdown:hover .dropdown-menu {
    opacity: 1;

    visibility: visible;

    pointer-events: auto;
  }
}

/* Mobile */

.menu-btn {
  display: none;

  border: none;

  background: none;

  font-size: 28px;
}

@media (max-width: 768px) {
  .container {
    height: 60px;
  }

  .logo img {
    width: 120px;
  }

  .menu-btn {
    display: block;
  }

  nav {
    display: none;

    position: absolute;

    top: 60px;

    left: 0;

    width: 100%;

    background: white;

    padding: 20px;

    flex-direction: column;

    gap: 20px;

    border-bottom: 1px solid #ddd;
  }

  nav.open {
    display: flex;
  }

  .dropdown {
    width: 100%;

    text-align: center;
  }

  .dropdown-menu {
    position: static;

    transform: none;

    width: 100%;

    margin-top: 10px;

    box-shadow: none;
  }

  /* 모바일 hover 제거 */

  .dropdown:hover .dropdown-menu {
    opacity: 0;

    visibility: hidden;

    pointer-events: none;
  }
}
</style>
