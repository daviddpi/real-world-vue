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
const loaded = ref(null)

onMounted(async () => {
  watchEffect(() => {
    loaded.value = false
    EventService.getEvents(perPage, props.page)
      .then((response) => {
        events.value = response.data
        totalEvent.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(()=>{
        console.log(loaded.value)
        loaded.value = true
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
    <div class="loading" v-if="!loaded"><div></div><div></div><div></div><div></div></div>
    <EventCard v-else v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="prev"
        >Previus</RouterLink
      >
      <RouterLink
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="page < totalPage"
        class="next"
        >Next</RouterLink
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

.pagination {
  display: flex;
  justify-content: space-around;
  width: 280px;
}

.pagination a {
  text-decoration: none;
  font-size: 21px;
  color: #353a34;
}

.loading {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loading div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid black;
  border-radius: 50%;
  animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}
.loading div:nth-child(1) {
  animation-delay: -0.45s;
}
.loading div:nth-child(2) {
  animation-delay: -0.3s;
}
.loading div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
