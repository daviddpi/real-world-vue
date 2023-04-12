<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
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
const totalEvent = ref(null)

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(perPage, props.page)
      .then((response) => {
        events.value = response.data
        totalEvent.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
      })
  })
})

const totalPage = computed(() => {
  return totalEvent.value / perPage
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="prev">Previus</router-link
      >
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="page < totalPage"
        class="next"
        >Next</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 25px;
}

.pagination{
  display: flex;
  justify-content: space-around;
  width: 280px;
}

.pagination a{
  text-decoration: none;
   font-size: 21px;
   color: #353a34;
}
</style>
