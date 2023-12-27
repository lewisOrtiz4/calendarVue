import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    addTaskModalIsVisible: false,
    dateSelected: {}
  },
  getters: {
    tasksByDate(state) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      if (tasks && tasks.length > 0) {
        state.tasks = [...tasks];
      }
      return state.tasks.filter(t => t.date == state.dateSelected.date)
     },
    allTasks(state) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      if (tasks && tasks.length > 0) {
        state.tasks = [...tasks];
       }
      
      return state.tasks
     },
    getDateSelected(state) {
      return state.dateSelected ;
    },
    getTasksLength(state) {
      return state.tasks.length;
    }
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload)
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, taskId) { 
      state.tasks = [...state.tasks.filter(t => t.id != taskId)];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    closeModal(state) {
      state.addTaskModalIsVisible = false;
    },
    showModal(state) {
      state.addTaskModalIsVisible = true;
    },
    setDateSelected(state, payload) {
      console.log("recibido", payload);
      state.dateSelected = payload;
    },
    cleanDateSelected(state) {
      state.dateSelected = {};
    },
    editNote(state, payload) {
      const oldTasks = state.tasks.filter(t => t.id != payload.id);
      state.tasks  = [...oldTasks, payload];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));

    }
  },
  actions: {},
  modules: {},
});
