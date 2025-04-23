<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo_Pinnboard.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Pinnboard
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" >Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" >About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/note" class="nav-link" >Note</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <RouterView />
</template>


