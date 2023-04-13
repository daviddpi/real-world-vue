<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  },
})
</script>

<template>
  <h1>404</h1>
  <h3>The {{ resource }} not exist</h3>
  <routerLink :to="{ name: 'event-list' }">Back to Event List</routerLink>
</template>

<style scoped>
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}
</style>
