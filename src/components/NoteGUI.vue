<script setup lang="ts">

/*TODO: change notes to have our custom design and attributes (see: CustomNode '../components/CustomNode.vue')
    import CustomNode from '../components/CustomNode.vue'
 */

import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import useDragAndDrop from '../useDnD'
import NoteService from '../services/NoteService.ts'

//TODO: Fully implement Note2, remove Note and adjust code
type Note2 = {
  title: string;
  content: string;
  author: string;
  id: number;
  color: string | null;
  creationDate: string | null;
  terminationDate: string | null;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
}

type Note = { id: number; text: string }

const notes = ref<Note[]>([])

const noteService = new NoteService()

const nodes = ref([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  }
])

noteService.getNotes().then((notes2: Note2[]) => {
  let id = 0;
  for (const note of notes2) {
    nodes.value.push({
      id: String(id),
      type: 'input',
      position: { x: note.xPosition, y: note.yPosition },
      data: { label: note.title },
    })
    id++
  }
  console.log(nodes.value)
})


const nameField = ref('')
const nextId    = ref(1)

//TODO: refresh site after running addNote so created notes appear automatically after posting to backend
function addNote() {
  if (!nameField.value.trim()) return
  notes.value.push({ id: nextId.value++, text: nameField.value.trim() })
  noteService.addNote({
    id: 100,
    title: "Test Title",
    content: nameField.value,
    author: "Me",
    color: null,
    creationDate: null,
    terminationDate: null,
    xPosition: 0,
    yPosition: 0,
    width: 100,
    height: 100
  });
  noteService.getNotes()
  nameField.value = ''
}

/* TODO: Notes need to to be removed by clicking an "X", they should also be removed from backend
     currently they are only removed from the drag and drop list but remain on the board
 */
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
<!--  TODO: Instead of using a form, a button has to "spawn" a Note on the board,
       the screens zooms into it and the user can add title, author, etc.
       it could also be possible to integrate the form into the note itself
       and disappear after clicking a button-->
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
<!-- TODO: this note list needs to be removed, instead notes should appear on the pinboard and be removed there-->
    <table class="nodes">
      <tbody>
      <tr v-if="!notes.length">
        <td colspan="2">Noch keine Notizen!</td>
      </tr>

      <tr v-for="note in notes" :key="note.id">
        <td><button @click="removeNote(note.id)">X</button></td>
        <td>
          <div class="vue-flow__node-input" :draggable="true"  @dragstart="onDragStart($event, { type: 'input', label: note.text })"  >{{ note.text }}</div>

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
        :pan-on-drag="false"
        :pan-on-scroll="false"
        :nodes-draggable="true"
        :nodes-connectable="false"
        :auto-pan-on-node-drag="false"
        :min-zoom="1"
    >
      <Background
          gap="10"
          pattern-color="#c0c0c0"
          bgColor="#f6ab67"/>
    </VueFlow>
  </div>
</div>

</template>
