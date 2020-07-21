<template>
   <div 
    class="task"
        @click="goToTask(task)"
        draggable
        @dragover.prevent
        @dragenter.prevent
        @dragstart="pickupTask($event, taskIndex, columnIndex )"
        @drop.stop="dropTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    >
    <!---.stop zastavi vybublavanie hore, inak sa nam spusti aj rodicovsky event--->
        <div>
            <span>{{ task.name }}</span>
            <p v-if="task.description" class="task-desc"> 
            {{ task.description }}
            </p>
        </div>
    </div>
</template>

<script>
import movingTaskOrColumnMixin from "@/mixins/movingTaskOrColumnMixin.js"
import { mapGetters } from 'vuex'

export default {
    mixins: [ movingTaskOrColumnMixin ],
    computed: {
        ...mapGetters(['getTask'])
    },

    props: {
        task: {
            type: Object,
            required: true
        },
        taskIndex: {
            type: Number,
            required: true
        },
    },

    methods: {

        goToTask (task) {
            this.$router.push({ name: 'task', params: { id: task.id } })
        },

        // @dragstart event sa odpali ak mysou zachytime element
        pickupTask( e, taskIndex, columnIndex ) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-task-index', taskIndex) // ulozi index tasku ked zaciname tahat
            e.dataTransfer.setData('from-col-index', columnIndex)  //ulozi pod kluc index col
            e.dataTransfer.setData('type', 'task') // co premiestnujeme
        },
    }
}
</script>

<style>
  .task {
    background: rgba(255, 255, 255, 0.5);
    margin-bottom: .5rem;
    padding: 1rem .5rem;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 grey;
    text-align: left
    }

    .task-desc {
        color: gray;
        font-size: .8rem;
        margin: 0;
    }

</style>