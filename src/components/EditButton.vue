<template>
  <button
      class="edit-btn bi bi-pencil-fill"
      data-tooltip="Notiz bearbeiten"
      @click="onEdit"
  />
</template>

<script setup lang="ts">
const { onEdit } = defineProps<{
  onEdit: () => void
}>()
</script>

<style scoped>
.edit-btn {
  background-color: transparent;
  border: none;
  margin-left: auto;
}

.edit-btn[data-tooltip] {
  position: relative;
  z-index: 1000;
}

.edit-btn[data-tooltip]:hover::after {
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