<template>
<div class="col-md-12">
    <div class="note-edit row col-md-11" v-if="updating">
         <b-list-group class="m-3">
            <b-list-group-item>
            
                <b-form inline class="col-md-11">
                    <b-form-input
                    type="text" v-model="titleEdit"
                    class="mb-2 mr-sm-2 mb-sm-0 mt-1"
                    placeholder="Title"
                    ></b-form-input>
                    
                    <b-form-input
                    type="text" v-model="noteEdit"
                    class="mb-2 mr-sm-2 mb-sm-0 mt-1"
                    placeholder="Note"
                    ></b-form-input>
                    
                    <b-form-input
                    type="time" v-model="time"
                    class="mb-2 mr-sm-2 mb-sm-0 mt-1"
                    ></b-form-input>
        
                    <b-button class="mt-1" variant="primary" @click="editNote()">Save</b-button>
                    <b-button class="mt-1" @click="toggleUpdate()">Cancel</b-button>
        
                </b-form>
            </b-list-group-item>
        </b-list-group>
    </div>

    <div class="note row col-md-11" v-if="!updating">
        <b-list-group class="m-3">
            <b-list-group-item>
                <h4>{{ note.title }}</h4>
                <p>
                {{ note.note }} - {{ note.date }}:{{ note.time }}
                </p>
                <span>
                    <b-button  class="m-1" @click="toggleUpdate(note)">Edit</b-button>
                    <b-button variant="danger" @click="deleteTask(note)">Delete</b-button>
                </span>
            </b-list-group-item>
        </b-list-group>

    </div>
</div>
</template>

<script>
export default {
    name: "note",
    props: ["note", "getTasks", "getCalendar", "refreshTasksByDate"],
    data() { 
        return {
            updating: false,
            noteEdit: "",
            titleEdit: "",
            time: this.note.time
        }
    },
    methods: {
        deleteTask(note) { 
            this.$store.commit("deleteTask", note.id);
            this.getTasks();
            this.refreshTasksByDate();
            this.getCalendar();
        },
        toggleUpdate(note) { 
            this.noteEdit = note ? note.note: '';
            this.titleEdit = note ? note.title: '';
            this.updating = !this.updating;
        },
        editNote() {
            const payload = { id: this.note.id, title: this.titleEdit, note: this.noteEdit, date: this.note.date, time: this.time }
            this.$store.commit("editNote", payload);
            this.refreshTasksByDate();
            this.getTasks()
            this.noteEdit = '';
            this.titleEdit = '';
            this.updating = false;
            console.log("save note.");
        }
    }
}
</script>

<style>

</style>