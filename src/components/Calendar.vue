<template>
    <div>
        <h1> {{ months[currentDate.getMonth()]}}</h1>
        <div>
            <button class="btn btn-primary m-3" @click="previousMonth()">Previous</button>
            <button class="btn btn-primary m-3" @click="nextMonth()">Next</button>
        </div>
        <!-- <pre>{{ tasks }}</pre><pre>{{ $store.state.addTaskModalIsVisible }}</pre> -->
        <ol>
            <li v-for=" day in days" v-bind:key="day" class="dia_semana">{{ day }}</li>
            <li v-for=" i in days_calendar" :style=" i.dia == 1 ? firstDayStyleObject: ''" v-bind:key="i.dia"  @click="gettasksByDate(i)">
                <date :dia="i" :getTasks="getTasks"  v-b-modal.modal-1/>    
            </li>
        </ol>
        <div>

        <b-modal id="modal-1" title="Add task">
            <div class="row">
                <div class="col-md-12">
                    <note-modal :getCalendar="getCalendar" :getTasks="getTasks" :refreshTasksByDate="refreshTasksByDate" :date="dateSelected"/>

                </div>
                <div class="col-md-12 m-1 p-1 row">
                    <NoteComponent v-for="t in tasksByDate" v-bind:key="t.title" :note="t" :getTasks="getTasks" :getCalendar="getCalendar" :refreshTasksByDate="refreshTasksByDate"/>
                </div>

            </div>
        </b-modal>
        </div>
    </div>
</template>

<script>
import days from "@/data/days-list.json";
import months from "@/data/months.json";
import NoteModal from "@/components/NoteFormComponent.vue"
import date from "@/components/DateComponent.vue"
import NoteComponent from "./NoteComponent.vue";
export default {
    components: {
    NoteModal: NoteModal,
    date: date,
    NoteComponent
},
    data() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1, // months 1-12 
            currentDate: new Date(),
            days: days,
            months: months,
            daysClasses: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            days_calendar: [],
            firstDayStyleObject: {
                gridColumnStart: 0
            },
            tasks: [],
            tasksByDate: [],
            visible: true,
            dateSelected: this.$store.state.dateSelected.date
        }
    },  
    mounted() {
        this.getTasks();
        this.getCalendar();
        console.log(months);
    },
    methods: {
        getTasks() { 
            this.tasks = this.$store.getters.allTasks;
        },
        gettasksByDate(diaRecieved) { 
            console.log("lol", diaRecieved);
            this.$store.commit("setDateSelected", diaRecieved);
            this.tasksByDate = this.$store.getters.tasksByDate;
        },
        refreshTasksByDate() { 
            this.tasksByDate = this.$store.getters.tasksByDate;
        },
        getCalendar() {
            // console.log("calendar.");
            fetch(`https://date.nager.at/api/v3/publicholidays/${this.year}/CO`)
                .then(res => res.json())
                .then(publicHolidays => {
                    // console.log(publicHolidays);
                    this.days_calendar = [];
                    this.currentDate = new Date(this.year, this.month, 0);
                    let diasmonth = this.currentDate.getDate();                             
                    
                    this.firstDayStyleObject.gridColumnStart = new Date(this.year, this.month - 1, 1).getDay() +1;
                    
                    for (var dia = 1; dia <= diasmonth; dia++) {
                        
                        const datetime = `${this.year}-${this.month}-${dia < 10 ? `0${dia}` : dia}`;
                        
                        const resHoliday = publicHolidays.find(p => p.date == datetime);

                        const tasks = this.tasks.filter(t => t.date == datetime)
                        
                        const d = {
                            dia: dia,
                            publicHoliday: resHoliday ? resHoliday.name : false,
                            date: datetime,
                            tasks: tasks
                        }
                        this.days_calendar.push(d);
                    }
                    console.log(this.days_calendar);
                })
                .catch(err => console.error)
        },
        nextMonth() {
            if (this.month == 12) {
                this.year++;
                this.month = "01";
            } else {
                this.month++;
            }
            this.getCalendar(); 
        },
        previousMonth() {
            if (this.month == 1) {
                this.year--;
                this.month = 12;
            } else {
                this.month--;
            }
            this.getCalendar(); 
        },
    }
}

</script>

<style>
div{
    text-align: center;
}
    ol{
        list-style: none;
        display: grid;
        grid-template-columns: repeat(7, 1fr); 
        padding: 0 !important;
    }

    li{
        text-align: right !important;
    }

    .dia_semana{
        font-weight: 700 !important;
        text-align: center !important;
        border-bottom: 1px solid rgb(110, 110, 110);
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