<script setup>
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService.js'
import router from '@/router'

const event = ref(null)
const props = defineProps({
  id: {
    required: true,
  },
})

onMounted(() => {
  EventService.getSingleEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
      router.push({
        name: 'page-404',
        params: { resource: 'event'}
      })
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{ name: 'event-details' }"> Details | </RouterLink>
      <RouterLink :to="{ name: 'event-register' }"> Register | </RouterLink>
      <RouterLink :to="{ name: 'event-edit' }"> Edit </RouterLink>
    </div>
    <RouterView :event="event" />
  </div>
</template>
