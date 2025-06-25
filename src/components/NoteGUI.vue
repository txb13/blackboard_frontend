<script setup lang="ts">

/**    TODO: change notes to have our custom design and attributes (see: CustomNode '../components/CustomNode.vue')
 import CustomNode from '../components/CustomNode.vue'
 **/
import {ref} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {Background} from '@vue-flow/background'
import NoteService from '../services/NoteService.ts'
import CustomNode from '../components/CustomNode.vue'
import type {PbNote} from '../types/notes'

import ZoomControls from "@/components/ZoomControls.vue";
import {useZoom} from "@/utils/useZoom.ts";
import NoteForm from "@/components/NoteForm.vue";
import RefreshButton from "@/components/RefreshButton.vue";

import {useNodeChangeHandler} from "@/utils/useChangeHandler.ts";
import {useNoteData} from "@/utils/useNoteData.ts";


const pbNotes = ref<PbNote[]>([])
const { fitView } = useVueFlow()
const {zoomToNextNote, zoomToPrevNote} = useZoom(pbNotes, fitView)

const noteService = new NoteService()

const {getNotes, addNote, refresh, titleField, authorField, contentField} = useNoteData(noteService, pbNotes, fitView)

const nodeTypes = {
  custom: CustomNode,
  // special: SpecialNode,
}

useNodeChangeHandler({ pbNotes, noteService })
getNotes()
refresh()

function handleAddNote(color: string) {
  addNote(color)  // Übergebe die Farbe an die addNote-Funktion
}

</script>

<template>
  <NoteForm
      v-model:titleField="titleField"
      v-model:authorField="authorField"
      v-model:contentField="contentField"
      @addNote="handleAddNote"
      :noteService="noteService"
      :pbNotes="pbNotes"
      :fitView="fitView"

  />
  <div class="container lg:container pb-0">
    <div class="canvas shadow-lg mb-0 bg-body rounded position-relative">
      <ZoomControls :on-next="zoomToNextNote" :on-prev="zoomToPrevNote" />
      <RefreshButton :refresh="refresh"></RefreshButton>
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
    <div class="position-absolute start-0 bottom-0 z-2" id="note-count" v-if="pbNotes.length!==0">
      Notizen: {{pbNotes.length}}
    </div>
    <div class="position-absolute start-0 bottom-0 z-2" id="note-count" v-if="pbNotes.length===0">
      keine Notizen vorhanden
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



#note-count {
  font-size: 1.2rem;
  color: black;
  user-select:none;
  padding: 10px;
}

</style>
