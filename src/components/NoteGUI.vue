<script setup lang="ts">

/**    TODO: change notes to have our custom design and attributes (see: CustomNode '../components/CustomNode.vue')
    import CustomNode from '../components/CustomNode.vue'
 **/
import {ref} from 'vue'
import {applyChanges, useVueFlow, VueFlow} from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import NoteService from '../services/NoteService.ts'
import type { Note } from '../services/NoteService.ts'
import CustomNode from '../components/CustomNode.vue'
import type { PbNote } from '../types/notes'

const { onNodesChange, applyNodeChanges } = useVueFlow()

let selectedId: number = 0

onNodesChange((changes) => {
  const nextChanges = []
  for (const change of changes) {
    if (change.type === 'remove') {
      console.log('Removing node:', change.id)
      console.log('Removing node data:', noteService.getNote(Number(change.id)))
      noteService.deleteNote(Number(change.id)).then(() => {
        console.log('Node removed successfully:', change.id)
      }).catch((error) => {
        console.error('Error removing node:', error)
      })
    } else if (change.type === 'select') {
      selectedId = Number(change.id)
      console.log(selectedId)
      nextChanges.push(change)
    } else {
      nextChanges.push(change)
    }
  }

  applyNodeChanges(nextChanges)
})



let pbNotes = ref<PbNote[]>([])
const {fitView } = useVueFlow()
const noteService = new NoteService()

const nodeTypes = {
  custom: CustomNode,
  // special: SpecialNode,
}


function pickColor(){
  const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0', '#FFF5BA'];
  return colors[Math.floor(Math.random() * colors.length)]
}

noteService.getNotes().then((notes: Note[]) => {
  let index: number = 0;
  for (const note of notes) {
    console.log('note:', index)
    console.log('note-id:', note.id)
    pbNotes.value.push({
      id: String(note.id),
      type: 'custom',
      position: { x: note.xPosition, y: note.yPosition },
      data: {
        color:  note.color || color.value, // Use the color from the note or a random one
        title:   note.title,
        content: note.content,
        author:  note.author,
        creationDate: note.creationDate,
      },
    })
    index++;
  }
})

function zoomToNote(target: string) {
  fitView({
    nodes: [target],
    duration: 1000,
  })
}


function deleteNote(noteId: number) {
    pbNotes.value = pbNotes.value.filter((node) => node.id !== String(noteId))
    noteService.deleteNote(noteId).then(() => {
      console.log('Node removed successfully:', noteId)
    }).catch((error) => {
      console.error('Error removing node:', error)
    })
}

const titleField = ref('')
const authorField = ref('')
const contentField = ref('')


async function addNote() {
  if (!contentField.value.trim()) return
  const newColor = pickColor()
  await refresh()
  await noteService.addNote({
    id: undefined,
    title: titleField.value.trim(),
    content: contentField.value.trim(),
    author: authorField.value.trim(),
    color: newColor,
    creationDate: undefined,
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

async function refresh() {
  const notes = await noteService.getNotes()
  console.log('notes:', notes)
  pbNotes.value = notes.map((note, index) => ({
    id: String(note.id),
    type: 'custom',
    position: {x: note.xPosition, y: note.yPosition},
    data: { title:   note.title,
      color: note.color,
      content: note.content,
      author:  note.author,
      creationDate: note.creationDate,},
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
    <button class="btn btn-outline-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      &gt;&gt; Neue Notiz erstellen &lt;&lt;
    </button>
    <!--
    <button class="btn btn-outline-warning" type="button" @click="deleteNote(selectedId)" aria-expanded="false" aria-controls="collapseExample">
      &gt;&gt; Ausgewählte Notiz löschen &lt;&lt;
    </button>
    -->
    <div class="collapse" id="collapseExample">
      <div class="card card-body">

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
          <button type="submit" class="btn btn-outline-warning">Notiz hinzufügen</button>
        </form>
      </div>
    </div>


  </div>

<div class="container lg:container mx-auto p-4">
  <div class="canvas shadow-lg p-3 mb-5 bg-body rounded ">
    <VueFlow
        class="board"
        :nodes="pbNotes"
        :node-types="nodeTypes"
        :pan-on-drag="true"
        :pan-on-scroll="true"
        :nodes-draggable="true"
        :nodes-connectable="false"
        :auto-pan-on-node-drag="false"
        :min-zoom="0.4"

    >
      <Background
          :gap="16"
          pattern-color="#c0c0c0"
          />
    </VueFlow>
  </div>
  <div class="textNotes" v-if=pbNotes>
    Anzahl Notizen: {{pbNotes.length}}
  </div>
</div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chango&family=Shadows+Into+Light&display=swap');
h2{
  font-family:'Chango', cursive;
  color: black;
}
.canvas{
  background-image: url('../assets/backgroundPinnboard.png');
}
.textNotes {
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.2rem;
  color: black;
  margin-top: -2rem;
}
</style>
