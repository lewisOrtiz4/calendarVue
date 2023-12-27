<template>
  <div class="date-section" :style="dia.tasks.length > 0 ? hasTasks:''"  >
    <h3>{{ dia.dia }}</h3>
    <p>{{dia.publicHoliday ? dia.publicHoliday : ''}}</p>
  </div>
</template>

<script>
import NoteModal from "@/components/NoteFormComponent.vue"

export default {
    name: "date",
    props: ["dia", "getTasks"],
    components: {
        NoteModal: NoteModal,
    },
    data() { 
        return {
            isVisible: false,
            hasTasks: {
                backgroundColor: "#ebe0ff",
            }
        }
    },
    methods: {
        
    }
}
</script>

<style>
.date-section{
    height: 100px;
    text-align: right !important; 
    border: 1px !important;
    border-color: #f8d8d8 !important;
}
.date-section:hover{
    cursor: pointer;
    background-color: #f4f4f4;
}
.modal{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    /* opacity: ; */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background-color: #4f4e4e56;
    
}

</style>