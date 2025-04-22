<script lang="ts">
import { defineComponent } from 'vue'

type Note = { id: number; name: string }
type Data = { notes: Note[]; nameField: string; currentId: number }

export default defineComponent({
  name: 'NotesList',
  props: { msg: { type: String, required: true } },

  data(): Data {
    return { nameField: '', currentId: 1, notes: [] }
  },

  methods: {
    addNote(name: string) {
      this.notes.push({ id: this.currentId++, name })
      this.nameField = ''
    },
    onFormSubmitted() {
      if (this.nameField.trim()) this.addNote(this.nameField.trim())
    },
    removeNote(id: number) {
      this.notes = this.notes.filter(n => n.id !== id)
    },
  },
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Erstelle hier Notizen auf unserem Digitalen Blackboard</h3>
  </div>

  <form @submit.prevent="onFormSubmitted">
    <textarea placeholder="Schreibe deine Notiz hier"
               rows="3" v-model="nameField" />
    <button>Notiz hinzufügen</button>
  </form>


<div class="container">
  <table>
    <tbody>
      <tr v-if="!notes.length">
        <td colspan="3"> Noch keine Notizen!</td>
      </tr>
      <tr v-for="note in notes" :key="note.id" class="note">
        <td><button @click="removeNote(note.id)">X</button></td>
        <td class="noteContainer ">{{ note.name }}</td>

      </tr>
    </tbody>
  </table>
</div>

</template>

<style scoped>


</style>
