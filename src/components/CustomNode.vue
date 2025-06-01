<script setup lang="ts">
import type {NodeProps } from '@vue-flow/core'
import {useVueFlow} from '@vue-flow/core'
import type { PbNoteData } from '../types/notes'

const props = defineProps<NodeProps<PbNoteData>>()

const { removeNodes } = useVueFlow()

function onDelete() {
  removeNodes([props.id])
}
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
  <div class="custom-node shadow-lg">
    <div class="card ">
      <div class="card-header">
        {{ props.id }}_{{ props.data.title }}
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{ props.data.content }}</p>
          <footer class="blockquote-footer">{{ props.data.author }}   <span class="title"> {{ props.data.creationDate }}</span></footer>
          <button class="delete-btn" data-tooltip="Notiz löschen"
                  @click="onDelete">X</button>
        </blockquote>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Protest+Guerrilla&family=Rubik+Iso&display=swap');
/*
  TODO: finish style and move it to main.css
*/

.card-header{
  font-weight: bold;
  font-size: 1.3rem;
}
.blockquote{
  font-size: 1rem;
  font-family: 'Gloria Hallelujah', cursive;
}

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
.delete-btn {
  background-image: url("../assets/iconDelete.png");
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  position: relative;
}

.delete-btn[data-tooltip] {
  position: relative;
}

.delete-btn[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;

}
</style>
