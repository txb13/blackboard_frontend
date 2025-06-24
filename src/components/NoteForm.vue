<template>
  <div class="container lg:container pb-0">
    <h2>Erstelle Notizen auf dem digitalen Blackboard</h2>
    <button class="btn btn-outline-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      &gt;&gt; Neue Notiz erstellen &lt;&lt;
    </button>
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
</template>

<script setup lang="ts">
defineProps<{
  titleField: () => void
  authorField: () => void
  contentField: () => void
}>()
</script>

<style scoped>

</style>