<template>
  <span :class="{ 'a-completer': aCompleter }">{{ valeur }}</span>
</template>

<script>
// Affiche une info de src/data/association.js, surlignée tant qu'elle n'est pas remplie.
export default {
  props: {
    valeur: { type: String, default: "" },
  },
  computed: {
    aCompleter() {
      return this.valeur.startsWith("À COMPLÉTER");
    },
  },
};
</script>

<style scoped>
.a-completer {
  background: #ffe1e1;
  color: #b00020;
  outline: 1px dashed #b00020;
  padding: 0 4px;
  border-radius: 4px;
}
</style>
