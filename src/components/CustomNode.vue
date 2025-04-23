<script setup lang="ts">
import { Handle, type NodeProps, Position } from '@vue-flow/core'
import { CustomData, CustomEvents } from './nodes'

const props = defineProps<NodeProps<CustomData, CustomEvents>>()
</script>

<template>
  <div class="custom-node">
    <Handle type="target" :position="Position.Top" />
    <div class="card">
      <div class="card-header">
        {{ props.data.title }}
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{ props.data.content }}</p>
          <footer class="blockquote-footer">{{ props.data.author }} <cite title="Source Title">{{ props.data.creationDate }}</cite></footer>
        </blockquote>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>





</template>

<style scoped>
.custom-node {
  padding: 10px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
}
</style>
