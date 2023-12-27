<template>
    <div>
        <b-form inline>
            <b-form-input
            v-model="title"
            class="mb-2 mr-sm-2 mb-sm-0 my-2"
            placeholder="Title"
            ></b-form-input>
            
            <b-form-input
            v-model="note"
            class="mb-2 mr-sm-2 mb-sm-0 my-2"
            placeholder="Note"
            ></b-form-input>
    
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0 my-2">
                <b-form-input type="time" v-model="time"></b-form-input>
            </b-input-group>
    
            <b-input-group class="my-2">
                  <b-button variant="primary" @click="saveNote()">Save</b-button>
              </b-input-group>
        </b-form>
    </div>
</template>

<script>
export default {
    name: "NoteModal",
    props: ["getCalendar", "getTasks", "refreshTasksByDate"],
    data() { 
        return {
            note: "",
            title: "",
            time: ""
        }
    },
    mounted() { 
    },
    methods: {
        saveNote() {
            if (this.note.length > 5) {
                // console.log("nueva", "date", this.date);
                const date = this.$store.getters.getDateSelected
                const data = {id: this.$store.getters.getTasksLength+1, title: this.title, note: this.note, date: date.date, time: this.time}
                this.$store.commit("addTask", data)
                this.getTasks();
                this.refreshTasksByDate();
                this.note = '';
                this.title = '';
                this.getCalendar();
                console.log("save note.");
            }
        }
    }
}
</script>

<style>
.modal-note{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>