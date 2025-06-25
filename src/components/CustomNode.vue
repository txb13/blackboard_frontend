<script setup lang="ts">
import {useVueFlow} from '@vue-flow/core'
import type {PbNoteData} from '../types/notes'
import DeleteButton from "@/components/DeleteButton.vue";
import EditButton from "@/components/EditButton.vue";
import {useEdit} from "@/utils/useEdit.ts";


import type {NodeProps } from '@vue-flow/core'
import {ref} from "vue";

const props = defineProps<NodeProps<PbNoteData>>()

const { fitView } = useVueFlow()

const {editNote, sendChanges} = useEdit(props, fitView)

const { removeNodes } = useVueFlow()

function onDelete() {
  removeNodes([props.id])
}

const isEditing = ref(false);

function onEdit() {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    editNote()
  }
  else {
    sendChanges()
  }
  console.log(isEditing)
}

</script>

<template>
  <img src="../assets/pin.svg"  alt="pin" class="pin"/>
  <div class="custom-node shadow-lg">
    <div class="card " v-if="!isEditing">
      <div class="card-header">
        <span class="mr-5">{{ props.id }}: {{ props.data.title }}</span>
        <div class="card-actions">
          <EditButton :onEdit="onEdit" />
          <DeleteButton :on-delete="onDelete" />
        </div>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{{ props.data.content }}</p>
          <footer class="blockquote-footer">{{ props.data.author }}   <span class="title"> {{ props.data.creationDate }}</span></footer>
          <p>gültig bis: <span id="text"> {{props.data.terminationDate}}</span></p>
        </blockquote>
      </div>
    </div>
    <div class="card " v-if="isEditing">
      <div class="card-header">
          <span class="mr-2">{{ props.id }}:</span>
        <input type="text" class="form-control mr-1" :value="props.data.title">
        <div class="card-actions">
          <EditButton :onEdit="onEdit" />
          <DeleteButton :on-delete="onDelete" />
        </div>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <textarea
              class="form-control"
              :value="props.data.content"
          ></textarea>
          <footer class="blockquote-footer edit-author-input">
            <input type="text" class="form-control mr-1 edit-author-text" :value="props.data.author">
            <span class="ml-2">{{ props.data.creationDate }}</span>
          </footer>
          <p>gültig bis: <span id="text"> {{props.data.terminationDate}}</span></p>
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
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
}

.card-body{
  padding: 10px;
}

.card {
  min-width: 300px;
  max-width: 300px;
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
}

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

</style>
