<script setup>
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService.js'

const event = ref(null)
const props = defineProps({
  id: {
    required: true
  },
})

onMounted(() => {
    
  EventService.getSingleEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <RouterLink :to="{name: 'event-details', params: { id: props.id } }">
        Details |
      </RouterLink>
      <RouterLink :to="{name: 'event-register', params: { id: props.id } }">
        Register |
      </RouterLink>
      <RouterLink :to="{name: 'event-edit', params: { id: props.id } }">
        Edit
      </RouterLink>
    </div>
    <p>Register for the event here</p>
  </div>
</template>
