<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})

const events = ref(null)
const perPage = 2
let totalPage = ref(null)

onMounted(() => {
  watchEffect( () =>{
    EventService.getEvents(perPage, props.page)
      .then((response) => {
        events.value = response.data
        totalPage.value = response.headers['x-total-count'] / perPage
      })
      .catch((error) => {
        console.log(error)
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >Previus</router-link
    >
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      v-if="page < totalPage">Next</router-link
    >
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
