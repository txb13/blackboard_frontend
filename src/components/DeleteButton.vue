<template>
  <button class="delete-btn bi bi-trash3-fill" data-tooltip="Notiz löschen" @click="onDelete"/>
</template>

<script setup lang="ts">
defineProps<{
  onDelete: () => void
}>()
</script>

<style scoped>
.delete-btn {
  background-color: transparent;
  border: none;
  margin-left: auto;
}

.delete-btn[data-tooltip] {
  position: relative;
  z-index: 1000;
}

.delete-btn[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute; /* changed from relative to absolute */
  left: 100%;
  bottom: -50%;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
}
</style>