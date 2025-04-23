<script setup lang="ts">

import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import useDragAndDrop from '../useDnD'


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
  <div class="container-fluid">
    <h2>Erstelle hier Notizen auf unserem digitalen Blackboard</h2>
    <form @submit.prevent="addNote">
      <div class="form-row">
        <div class="form-group col-md-6">
          <input class="form-control" placeholder="Titel">
        </div>
        <div class="form-group col-md-6">
          <input class="form-control" placeholder="Autor">
        </div>
      </div>
      <div class="form-group">
      <textarea class="form-control"
                v-model="nameField"
                placeholder="Schreibe deine Notiz hier …"
                rows="3">
      </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Notiz hinzufügen</button>
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
  </div>

<div class="container-fluid">
  <div class="canvas">
    <VueFlow
        class="board"
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        :nodes="nodes"
    >
      <Background gap="20" pattern-color="#c0c0c0"/>

<!--      <DropzoneBackground-->
<!--          :style="{-->
<!--          backgroundColor: isDragOver ? '#0b59ac' : 'transparent',-->
<!--          transition: 'background-color .2s ease',-->
<!--        }"-->
<!--      >-->
<!--        <p v-if="isDragOver">Hier ablegen</p>-->
<!--      </DropzoneBackground>-->
    </VueFlow>
  </div>
</div>

</template>

