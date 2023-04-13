<script setup>
import router from '@/router'

function register() {
  router.push({
    name: 'event-details'
  })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>
