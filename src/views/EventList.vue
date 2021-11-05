<template>
    <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1} }"
        rel="prev"
        v-if="page != 1">
        Previous</router-link>

        <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1} }"
        rel="next"
        v-if="hasNextPage"
        >
        Next</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'

export default {
  name: "EventList",
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return{
      events: null,
      totalEvents: 0
    }
  },
  created() {
    this.events = null
    watchEffect(() => { // forced regular update of the EventList
      EventService.getEvents(2, this.page) // shows 2 events per page and current page
        .then(response => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count']
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents/2)  // div2 because we show 2 events per page

      return this.page < totalPages //true if not last page
    }
  }
}
</script>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination{
  display: flex;
  width: 290px;
}
.pagination a{
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
  }
#page-prev{
  text-align: left;
}
#page-next {
  text-align: right;
}

</style>