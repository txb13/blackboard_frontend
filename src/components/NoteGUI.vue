<script setup lang="ts">

/**    TODO: change notes to have our custom design and attributes (see: CustomNode '../components/CustomNode.vue')
    import CustomNode from '../components/CustomNode.vue'
 **/
import {ref} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import NoteService from '../services/NoteService.ts'
import type { Note } from '../services/NoteService.ts'
import CustomNode from '../components/CustomNode.vue'
import type {PbNote} from './CustomNode.vue'

const pbNotes = ref<PbNote[]>([])
const {fitView } = useVueFlow()
const noteService = new NoteService()

const nodeTypes = {
  custom: CustomNode,
  // special: SpecialNode,
}

noteService.getNotes().then((notes: Note[]) => {
  for (const note of notes) {
    pbNotes.value.push({
      id: String(note.id),
      type: 'custom',
      position: { x: note.xPosition, y: note.yPosition },
      data: {
        title:   note.title,
        content: note.content,
        author:  note.author, },
    })
  }
})

function zoomToNote(target: string) {
  fitView({
    nodes: [target],
    duration: 1000,
  })
}

const titleField = ref('')
const authorField = ref('')
const contentField = ref('')

async function addNote() {
  if (!contentField.value.trim()) return
  await refresh()
  await noteService.addNote({
    id: 0,
    title: titleField.value.trim(),
    content: contentField.value.trim(),
    author: authorField.value.trim(),
    color: null,
    creationDate: null,
    terminationDate: null,
    xPosition: Math.floor(Math.random() * 1000),
    yPosition: Math.floor(Math.random() * 400),
    width: 100,
    height: 100
  });
  await refresh()
  setTimeout(() => {
    zoomToNote(String(pbNotes.value.length - 1))
  }, 50)
  // contentField.value = ''
}

/* TODO: Notes need to to be removed by clicking an "X", they should also be removed from backend
 */
async function deleteNote(id: string) {
  await noteService.deleteNote(Number(id))
  pbNotes.value = pbNotes.value.filter((note) => note.id !== id)
}

async function refresh() {
  const notes = await noteService.getNotes()
  pbNotes.value = notes.map((note, index) => ({
    id: String(index),
    type: 'custom',
    position: {x: note.xPosition, y: note.yPosition},
    data: { title:   note.title,
      content: note.content,
      author:  note.author,},
  }))
  await fitView({duration: 500})
}

refresh()

</script>

<template>
<!--  TODO: Instead of using a form, a button has to "spawn" a Note on the board,
       the screens zooms into it and the user can add title, author, etc.
       it could also be possible to integrate the form into the note itself
       and disappear after clicking a button-->
  <div class="container lg:container mx-auto p-4">
    <h2>Erstelle Notizen auf dem digitalen Blackboard</h2>
    <form @submit.prevent="addNote">
      <div class="form-row">
        <div class="form-group col-md-6">
          <input class="form-control" v-model="titleField" placeholder="Titel">
        </div>
        <div class="form-group col-md-6">
          <input class="form-control" v-model="authorField" placeholder="Autor">
        </div>
      </div>
      <div class="form-group">
      <textarea class="form-control"
                v-model="contentField"
                placeholder="Schreibe deine Notiz hier …"
                rows="3">
      </textarea>
      </div>
      <button type="submit" class="btn btn-primary">Notiz hinzufügen</button>
    </form>
  <div v-if=pbNotes>
    Anzahl Notizen: {{pbNotes.length-1}}
  </div>
  </div>
<div class="container lg:container ">
  <div class="canvas">
    <VueFlow
        class="board"
        :nodes="pbNotes"
        @node:delete="deleteNote"
        :node-types="nodeTypes"
        :pan-on-drag="true"
        :pan-on-scroll="true"
        :nodes-draggable="true"
        :nodes-connectable="false"
        :auto-pan-on-node-drag="false"
        :min-zoom="1"
    >
      <Background
          :gap="16"
          pattern-color="#c0c0c0"
          bgColor="#333"/>
    </VueFlow>
  </div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
h2{
  font-family: 'Shadows Into Light', cursive;
  color: #c61111;}
</style>
