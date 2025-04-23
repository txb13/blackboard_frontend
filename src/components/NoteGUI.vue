<script setup lang="ts">

import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import useDragAndDrop from '../useDnD'
import DropzoneBackground from './DropzoneBackground.vue'


type Note = { id: number; name: string }

const notes     = ref<Note[]>([])
const nameField = ref('')
const nextId    = ref(1)

function addNote() {
  if (!nameField.value.trim()) return
  notes.value.push({ id: nextId.value++, name: nameField.value.trim() })
  nameField.value = ''
}

function removeNote(id: number) {
  notes.value = notes.value.filter(n => n.id !== id)
}

const {
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragOver,
} = useDragAndDrop()
</script>

<template>

  <h1>Erstelle hier Notizen auf unserem digitalen Blackboard</h1>

  <form @submit.prevent="addNote">
    <textarea
      v-model="nameField"
      rows="3"
      placeholder="Schreibe deine Notiz hier …"
    />
    <button>Notiz hinzufügen</button>
  </form>

  <table class="nodes">
    <tbody>
    <tr v-if="!notes.length">
      <td colspan="2">Noch keine Notizen!</td>
    </tr>

    <tr v-for="note in notes" :key="note.id">
      <td><button @click="removeNote(note.id)">X</button></td>
      <td>
        <div class="vue-flow__node-input" :draggable="true"  @dragstart="onDragStart($event, { type: 'input', label: note.name })"  >{{note.name}}</div>

      </td>
    </tr>
    </tbody>
  </table>

  <div class="canvas">
    <VueFlow
      class="board"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <Background gap="20" pattern-color="#c0c0c0" />

      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color .2s ease',
        }"
      >
        <p v-if="isDragOver">Hier ablegen</p>
      </DropzoneBackground>
    </VueFlow>
  </div>
</template>

<style scoped>


.canvas  { height: 600px; border: 1px solid #ddd; margin-top: 1rem; }
.board   { height: 100%; }
textarea { width: 100%; }

.draggable-note { cursor: grab; }
.draggable-note:active { cursor: grabbing; }
</style>
