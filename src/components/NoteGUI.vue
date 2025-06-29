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
  <div class="container lg:container">
    <div class="canvas shadow-lg bg-body rounded position-relative">
      <ZoomControls :on-next="zoomToNextNote" :on-prev="zoomToPrevNote" />
      <RefreshButton :refresh="refresh"></RefreshButton>
      <VueFlow
          class="board"
          :nodes="pbNotes"
          :node-types="nodeTypes"
          :pan-on-drag="!isEditing"
          :pan-on-scroll="true"
          :nodes-draggable="!isEditing"
          :nodes-connectable="false"
          :auto-pan-on-node-drag="false"
          :min-zoom="0.1"
      >
        <Background
            :gap="16"
            pattern-color="#c0c0c0"
            />
      </VueFlow>
    <div class="position-absolute start-0 bottom-0 z-2" v-if="pbNotes.length===0">
      keine Notizen vorhanden
    </div>
    <div class="position-absolute start-0 bottom-0 z-2" id="note-count" v-else>
      Notizen: {{pbNotes.length}}
    </div>

  </div>
</div>
</template>

<script setup lang="ts">
import { useVueFlow, VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import NoteService from '../services/NoteService.ts'
import CustomNode from '../components/CustomNode.vue'
import ZoomControls from "@/components/ZoomControls.vue"
import NoteForm from "@/components/NoteForm.vue"
import RefreshButton from "@/components/RefreshButton.vue"
import { useNodeChangeHandler } from "@/utils/useChangeHandler.ts"
import { useNoteData } from "@/utils/useNoteData.ts"
import { useEditStore } from '@/stores/useEditStore'
import { useNoteStore } from '@/stores/useNoteStore'
import { useZoom } from "@/utils/useZoom.ts"
import { onMounted } from 'vue'

const { isEditing } = useEditStore()
const { pbNotes, refresh } = useNoteStore()
const { fitView } = useVueFlow()
const { zoomToNextNote, zoomToPrevNote } = useZoom(pbNotes, fitView)

const noteService = new NoteService()
const { getNotes, addNote, titleField, authorField, contentField } = useNoteData(noteService, pbNotes, fitView)

const nodeTypes = {
  custom: CustomNode,
}

onMounted(async () => {
  await getNotes()
  await refresh()
})

useNodeChangeHandler({ pbNotes, noteService })

function handleAddNote(color: string) {
  addNote(color)
}
</script>

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
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-image: url('../assets/backgroundPinnboard.png');
}
#note-count {
  font-size: 1.2rem;
  color: black;
  user-select:none;
  padding: 10px;
}

</style>
