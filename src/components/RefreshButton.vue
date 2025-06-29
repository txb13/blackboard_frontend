<template>
  <div class="position-absolute top-0 end-0 z-2">
    <button @click="refresh" class="refresh-btn bi bi-arrow-clockwise" type="button"></button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  refresh: () => void
}>()
</script>

<style scoped>
.refresh-btn {
  height: 30px;
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 25px;
}
</style>
