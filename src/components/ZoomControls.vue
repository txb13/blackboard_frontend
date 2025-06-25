<template>
  <div class="position-absolute top-0 z-2 d-flex align-items-center gap-2">
    <button class="zoom-btn bi bi-arrow-left-square" @click="onPrev"></button>
    <span id="zoom">Zoom</span>
    <button class="zoom-btn bi bi-arrow-right-square" @click="onNext"></button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  onPrev: () => void
  onNext: () => void
}>()
</script>

<style scoped>
.zoom-btn {
  background-color: transparent;
  border: none;
  padding: 10px;
}

#zoom {
  font-size: 1.2rem;
  color: black;
  user-select: none;
}
</style>