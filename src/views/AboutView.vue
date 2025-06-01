<template>
  <div class="container lg:container mx-auto p-4">
    <h2>Über uns</h2>

    <h4>Team Mitglieder</h4>
    <ul>
      <li>Tobias Beneke 598125</li>
      <li>Felix Riedel 588866</li>
    </ul>

    <h4>Idee</h4>
    <ul>
      <li>Pinnwand-App</li>
      <li>User kann „Notizzettel“ auf Pinnwand erstellen und mit Text füllen</li>
      <li>User kann Farbe wählen</li>
      <li>Größe von Notiz passt sich an Inhalt an bzw. kann selbst gewählt werden</li>
      <li>Notizinhalt kann bearbeitet werden</li>
    </ul>

    <h4>Anforderungen</h4>
    <ul>
      <li>Web-App wird über Render deployed und ist öffentlich erreichbar</li>
      <li>Entitäten werden in einer Datenbank gespeichert, die über die Web-Oberfläche erstellt werden können</li>
      <li>Es gibt Frontend- und Backend-Tests, die automatisiert über GitHub (CI/CD) ausgeführt werden</li>
      <li>Credentials werden nicht im Klartext bei GitHub gespeichert</li>
      <li>Spring Boot REST API kommuniziert mit dem Vue.js-Frontend</li>
      <li>App setzt die ursprüngliche Projektidee mit dem vorgegebenen Tech-Stack (Spring, Vue, Postgres) um</li>
      <li>Projekt wird in der Übung (ggf. vom Paar) demonstriert und enthält eine ReadMe-Datei zur Nutzung</li>
    </ul>
  </div>

</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chango&family=Shadows+Into+Light&display=swap');
h2{
  font-family:'Chango', cursive;
  color: black;
}
h4{
  font-family:'Chango', cursive;
  color: black;
}
</style>
<script setup lang="ts">
</script>