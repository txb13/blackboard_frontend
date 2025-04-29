<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core'
//import { CustomData, CustomEvents } from './nodes'

const props = defineProps<NodeProps<CustomData, CustomEvents>>()
</script>

<template>
  <img src="../assets/pin.svg"  alt="pin" class="pin"/>
  <div class="custom-node">
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
.pin {
  width: 70px;
  top: 0;
  transform: translate(50%, 30%);
  padding: 0;
  margin: 0
}
</style>
