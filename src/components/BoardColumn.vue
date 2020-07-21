<template>
   <div 
        class="column"
        @drop="dropTaskOrColumn($event, column.tasks, columnIndex)" 
        @dragover.prevent
        @dragenter.prevent
        draggable
        @dragstart.self="pickupColumn($event, columnIndex)"> 
          <h4>{{ column.name }}</h4>
          <!-- .self modifier tahaj LEN column, nie jeho child componenty -->
            
            <TaskItem 
                v-for="(task, taskIndex) in column.tasks" 
                :board="board"
                :column="column"
                :task="task"
                :taskIndex="taskIndex" 
                :columnIndex="columnIndex"
                :key="taskIndex"
            />
          <input type="text" 
          placeholder="+ Add New Task" 
          class="add-task-input" 
          @keyup.enter="addTask($event, column.tasks)">  <!-- $event - defaultna hodnota z inputu -->
      </div>
</template>

<script>
import TaskItem from '@/components/TaskItem'
import movingTaskOrColumnMixin from "@/mixins/movingTaskOrColumnMixin.js"

export default {
    components: { TaskItem },
    mixins: [ movingTaskOrColumnMixin ],


    methods: {
        
        addTask(event, taskList) {
            this.$store.commit('CREATE_TASK', {
            taskList,
            name: event.target.value
            })
            event.target.value = ''
        },
      
        pickupColumn(e, colIndex ) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('column-index', colIndex)
            e.dataTransfer.setData('type', 'column')
        }
    }
}
</script>

<style>
    .column {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    min-width: 350px;
    background-color: #99c6ff;
    box-shadow: 0 2px 2px 0px grey;
    border-radius: 5px;
    }


    .add-task-input::placeholder {
    color: black
    }
    .add-task-input:focus,
    .add-task-input:active {
    background-color: rgba(104, 104, 199, 0.514)
    }
    .add-task-input {
    outline: none;
    padding: .5em;
    background: transparent;
    border: none;
    border-radius: 5px;
    transition: all .1s ease-out
    }
</style>