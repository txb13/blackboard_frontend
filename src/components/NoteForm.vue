<template>
  <div class="container lg:container pb-0">
    <h2>Erstelle Notizen auf dem digitalen Blackboard</h2>
    <button class="btn btn-outline-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      &gt;&gt; Neue Notiz erstellen &lt;&lt;
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group col-md-6">
              <input class="form-control" v-model="localTitle" placeholder="Titel" />
            </div>
            <div class="form-group col-md-6">
              <input class="form-control" v-model="localAuthor" placeholder="Autor" />
            </div>
          </div>
          <div class="form-group">
            <textarea
                class="form-control"
                v-model="localContent"
                placeholder="Schreibe deine Notiz hier …"
                rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="Farbe auswählen"> Farbe auswählen</label>
            <input type="color" class="form-control form-control-color"
                   id="Farbe auswählen" title="Farbe auswählen" />
          </div>
          <button type="submit" class="btn btn-outline-warning">Notiz hinzufügen</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'



const selectedColor = ref('')
const props = defineProps<{
  titleField: string
  authorField: string
  contentField: string

}>()



const emit = defineEmits<{
  (e: 'update:titleField', value: string): void
  (e: 'update:authorField', value: string): void
  (e: 'update:contentField', value: string): void
  (e: 'addNote'): void
}>()

// Create local refs to bind to v-model
const localTitle = ref(props.titleField)
const localAuthor = ref(props.authorField)
const localContent = ref(props.contentField)

// Sync local changes back to parent
watch(localTitle, (val) => emit('update:titleField', val))
watch(localAuthor, (val) => emit('update:authorField', val))
watch(localContent, (val) => emit('update:contentField', val))

function handleSubmit() {
  emit('addNote')

}
</script>
