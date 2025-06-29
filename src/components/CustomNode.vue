<script setup lang="ts">
import { useVueFlow } from '@vue-flow/core'
import type { PbNoteData } from '../types/notes'
import DeleteButton from "@/components/DeleteButton.vue";
import EditButton from "@/components/EditButton.vue";
import { useEditStore } from '@/stores/useEditStore'
import type { NodeProps } from '@vue-flow/core'
import { computed } from "vue"
import type {Note} from "../services/NoteService.ts";

const props = defineProps<NodeProps<PbNoteData>>()
const { removeNodes } = useVueFlow()
const { currentEditingId, toggleEdit, updateField, getPendingChanges } = useEditStore()

const isCurrentNodeEditing = computed(() => currentEditingId.value === props.id)
const editingData = computed(() => getPendingChanges())

const {saveChanges} = useEditStore()

import NoteService from '../services/NoteService.ts'
import {useZoom} from "@/utils/useZoom.ts";
import {useNoteStore} from "@/stores/useNoteStore.ts";

const { pbNotes } = useNoteStore()
const { fitView } = useVueFlow()
const { zoomToNote } = useZoom(pbNotes, fitView)

const noteService = new NoteService()

async function handleEdit() {
  zoomToNote(props.id)
  if (isCurrentNodeEditing.value) {
    const updatedData: Note = {
      id: Number(props.id),
      title: editingData.value?.title ?? props.data.title,
      content: editingData.value?.content ?? props.data.content,
      author: editingData.value?.author ?? props.data.author,
      xPosition: props.position.x,
      yPosition: props.position.y,
      width: 100,
      height: 100,
      color: props.data.color ?? '#fff',
      creationDate: props.data.creationDate, // ✅ Pflichtfeld
      terminationDate: props.data.terminationDate, // optional, aber mitgeben schadet nicht
    }

    await saveChanges(noteService, updatedData)
  } else {
    toggleEdit(props.id, props.data)
  }
}

function handleInputChange(field: 'title' | 'content' | 'author', event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement
    updateField(field, target.value)
}

function onDelete() {
    removeNodes([props.id])
}


</script>

<template>
  <img src="../assets/pin.svg"  alt="pin" class="pin"/>
  <div class="custom-node shadow-lg">
    <div class="card " v-if="!isCurrentNodeEditing">
      <div class="card-header">
        <span class="mr-5">{{ props.data.title }}</span>
        <div class="card-actions">
          <EditButton :onEdit="handleEdit" icon="bi-pencil-fill" data-tooltip="Notiz bearbeiten"/>
          <DeleteButton :on-delete="onDelete" />
        </div>
      </div>
      <div class="card-body p-4">
        <blockquote class="blockquote ">
          <h6>{{ props.data.content }}</h6>
          <footer class="blockquote-footer mt-2 mb-1">{{ props.data.author }}   <p class="author"> {{ props.data.creationDate }}</p></footer>
          <p>gültig bis: <span id="text"> {{props.data.terminationDate}}</span></p>
        </blockquote>
      </div>
    </div>
    <div class="card " v-if="isCurrentNodeEditing">
      <div class="card-header">
          <span class="mr-2">{{ props.id }}:</span>
        <input
            type="text"
            class="form-control mr-1"
            :value="editingData?.title"
            @input="event => handleInputChange('title', event)"
        >
        <div class="card-actions">
          <EditButton :onEdit="handleEdit" icon="bi-check-circle" data-tooltip="Änderungen speichern"/>
          <DeleteButton :on-delete="onDelete" />
        </div>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <textarea
              class="form-control"
              :value="editingData?.content"
              @input="event => handleInputChange('content', event)"
          ></textarea>
          <footer class="blockquote-footer edit-author-input">
            <input
                type="text"
                class="form-control mr-1 edit-author-text"
                :value="editingData?.author"
                @input="event => handleInputChange('author', event)"
            >
            <span class="ml-2">{{ props.data.creationDate }}</span>
          </footer>
          <p id="text2">gültig bis: <span id="text"> {{props.data.terminationDate}}</span></p>
        </blockquote>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Protest+Guerrilla&family=Rubik+Iso&display=swap');
.card-header{
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  word-wrap: break-word;
}

.card-body{
  padding: 10px;
}

.card {
  min-width: 300px;
  max-width: 450px;
  font-family: 'Gloria Hallelujah', cursive;
}

.blockquote{
  font-size: 1rem;
  font-family: 'Gloria Hallelujah', cursive;
}

.form-control{
  padding: 0 10px;
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

#text{
  color: crimson;
  font-size: 0.8rem;
}
p{font-size: 0.8rem;}

.card-actions {
  margin-left: auto;
  display: flex;
}
.edit-author-input {
  margin-top: 10px;
  display: flex;
}
.edit-author-text {
  font-size: .875em;
  color: #6c757d;
}

* {
  word-wrap: break-word;
}

</style>
