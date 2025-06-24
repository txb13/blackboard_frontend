<script setup lang="ts">

/**    TODO: change notes to have our custom design and attributes (see: CustomNode '../components/CustomNode.vue')
 import CustomNode from '../components/CustomNode.vue'
 **/
import {ref} from 'vue'
import {type NodeChange, type NodePositionChange, useVueFlow, VueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import type {Note} from '../services/NoteService.ts'
import NoteService from '../services/NoteService.ts'
import CustomNode from '../components/CustomNode.vue'
import type {PbNote} from '../types/notes'

import ZoomControls from "@/components/ZoomControls.vue";
import {useZoom} from "@/utils/useZoom.ts";
import NoteForm from "@/components/NoteForm.vue";


const { onNodesChange, applyNodeChanges} = useVueFlow()

let selectedId: number = 0
let posChanges: NodePositionChange[] = []

onNodesChange((changes) => {
  const nextChanges: NodeChange[] = []
  for (const change of changes) {
    if (change.type === 'remove') {
      console.log('Removing node:', change.id)
      pbNotes.value = pbNotes.value.filter(node => node.id !== String(change.id))
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

    } else if (change.type === 'position') {
      const posChange = change as NodePositionChange;
      console.log('Position change detected for node:', change.id)
      selectedId = Number(change.id)

      if (posChange.dragging === true) {
        posChanges.push(posChange)
        nextChanges.push(posChange)

      } else if (posChange.dragging === false) {
        nextChanges.push(posChange)
        const lastPosChange = posChanges.filter(c => (c as NodePositionChange).dragging).at(-1);

        if (lastPosChange) {
          console.log("Moved Node:", selectedId, "to", lastPosChange.position.x, lastPosChange.position.y);
          noteService.getNote(selectedId).then((notes: Note) => {
            const updatedNote = {
              ...notes,
              xPosition: Math.floor(lastPosChange.position.x),
              yPosition: Math.floor(lastPosChange.position.y)
            };
            console.log(updatedNote);
            noteService.updateNote(updatedNote, selectedId).then(() => {
              console.log('Node updated successfully:', selectedId)
            }).catch((error) => {
              console.error('Error updating node:', error)
            })
          });
        }

        posChanges = []
      }

    } else {
      nextChanges.push(change)
    }
  }
  console.log("Changes", nextChanges)
  applyNodeChanges(nextChanges)
})



const pbNotes = ref<PbNote[]>([])
const { fitView } = useVueFlow()
const { zoomToNote, zoomToNextNote, zoomToPrevNote} = useZoom(pbNotes, fitView)
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
        color:  note.color || pickColor(),
        title:   note.title,
        content: note.content,
        author:  note.author,
        creationDate: note.creationDate,
        terminationDate: note.terminationDate
      },
    })
    index++;
  }
})

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
    terminationDate: undefined,
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
  pbNotes.value = notes.map((note) => ({
    id: String(note.id),
    type: 'custom',
    position: {x: note.xPosition, y: note.yPosition},
    data: { title:   note.title,
      color: note.color,
      content: note.content,
      author:  note.author,
      creationDate: note.creationDate,
      terminationDate: note.terminationDate
    },
  }))
  await fitView({duration: 500})
}

refresh()


</script>

<template>
  <NoteForm
      v-model:titleField="titleField"
      v-model:authorField="authorField"
      v-model:contentField="contentField"
      @addNote="addNote"
  />
  <div class="container lg:container pb-0">
    <div class="canvas shadow-lg mb-0 bg-body rounded position-relative">
      <ZoomControls :on-next="zoomToNextNote" :on-prev="zoomToPrevNote" />
    <div class="position-absolute top-0 end-0 z-2">
      <button @click="refresh" class="refresh-btn bi bi-arrow-clockwise" type="button"></button>
    </div>

    <VueFlow
        class="board"
        :nodes="pbNotes"
        :node-types="nodeTypes"
        :pan-on-drag="true"
        :pan-on-scroll="true"
        :nodes-draggable="true"
        :nodes-connectable="false"
        :auto-pan-on-node-drag="false"
        :min-zoom="0.1"
    >
      <Background
          :gap="16"
          pattern-color="#c0c0c0"
          />
    </VueFlow>
    <div class="position-absolute start-0 bottom-0 z-2" id="note-count" v-if=pbNotes>
      Notizen: {{pbNotes.length}}
    </div>
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

.canvas  {
  height: 70vh;
  width: 100%;
  border: 1px solid #ddd;
  margin-top: 1rem;
  background-image: url('../assets/backgroundPinnboard.png');
}

.refresh-btn {
  height: 30px;
  background-color: transparent;
  border: none;
  padding: 10px;
}

#note-count {
  font-size: 1.2rem;
  color: black;
  user-select:none;
  padding: 10px;
}

.bi {
  font-size: 1.2rem;
}


</style>
