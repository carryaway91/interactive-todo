<template>
  <div class="task-view">
    <input
      type="text" 
      name="name"
      :value="task.name" 
      class="task-input" 
      placeholder="Event name"
      @keyup.enter="updateTaskPropery($event, 'name')"
      >
    <textarea 
      name="description" 
      class="description-input" 
      placeholder="Description"
      @keyup.enter="updateTaskPropery($event, 'description')"
      :value="task.description"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },

  methods: {
    updateTaskPropery(e, key) {
      this.$store.commit('UPDATE_TASK', { 
        task: this.task,
        key,
        value: e.target.value
      }),
      this.$router.push('/')
    }
  }
}
</script>

<style>

  .task-view {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 700px;
    left: 23%;
    top: 5em;
    padding: 1em 2em;
    border-radius: 8px;
  }

  .task-input, .description-input {
    padding: 1rem .5rem;
    background: transparent;
    border:none;
    outline: none
  }

  .description-input {
    height: 15rem;
    resize: none
  }
</style>
