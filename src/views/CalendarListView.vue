<template>
  <div class="container">
    <div class="row">
      <h1>Tasks</h1>
       <b-form-input
            type="text" 
            v-model="search" 
            @keyup="searchTask()"
            placeholder="Search note"
          ></b-form-input>
    </div>
    <b-list-group class="m-3" v-for="t in taskToDisplay" v-bind:key="t.title">
      <b-list-group-item>
        <h4>{{ t.title }}</h4>
        <p>
          {{ t.note }} - {{ t.date }}:{{ t.time }}
        </p>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { ListGroupPlugin } from 'bootstrap-vue'
export default {
  name: "Calendar-list-view",
  components: {
    ListGroupPlugin: ListGroupPlugin
  },
  data() { 
    return {
      tasks: [],
      taskToDisplay: [],
      search: ""
    }
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    searchTask() {
      this.taskToDisplay = this.tasks.filter(t => t.note.includes(this.search) || t.title.includes(this.search))
    },
    getTasks() {
      this.tasks = this.$store.getters.allTasks;
      this.taskToDisplay = this.tasks;
    },
  }
}
</script>

<style>

</style>