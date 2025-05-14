<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core'
import {Note} from '../services/NoteService.ts'
import {PbNote} from './NoteGUI.vue'
//import { CustomData, CustomEvents } from './nodes'

const props = defineProps<NodeProps<PbNote>>()

</script>

<template>
<!--
  TODO: finish layout of CustomNode:
    - it needs to feature all attributes
    - width and height need to get dimensions from note
    - color needs to adjust
    - showcase if a note is terminated (for example grey it out)
-->

  <img src="../assets/pin.svg"  alt="pin" class="pin"/>
  <div class="custom-node">
    <div class="card">
      <button class="btn-close" @click="$emit('delete', props.id)">×</button>
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
/*
  TODO: finish style and move it to main.css
*/
.custom-node {
  padding: 10px;
  border: 1px solid #ccc;
  background: v-bind('props.data.color');
  border-radius: 4px;
  color: black;
}

.pin {
  width: 70px;
  top: 0;
  transform: translate(50%, 30%);
  padding: 0;
  margin: 0
}
</style>
