<template>
  <div class="container">

    <div class="board">

      <BoardColumn
        v-for="( col, colIndex ) in board.columns" 
        :board="board"
        :column="col"
        :columnIndex="colIndex" 
        :key="colIndex"
      />
      <div v-if="isTaskOpen" class="task-bg" @click.self="close">
          <router-view />
      </div>
    </div>
     <div style="margin-top: 1rem">
        <input type="text" @keyup.enter="addColumn" v-model="columnName">
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'

export default {
  components: { BoardColumn }, 
  data() {
    return {
      columnName: ''
    }
  },

  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },

  methods: {
   
    close () {
      this.$router.push({ name: 'board' })
    },

    addColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.columnName
      })
      this.columnName = ''
    },
  }
}
</script>

<style>

.container {
  display: flex;
  flex-direction: column
}

.board {
  display:flex;
  justify-content: space-between;
}


.task-bg {
position: absolute;
    background-color: rgb(0,0,0,.5);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.add-task-input::placeholder {
  color: black
}
.add-task-input:focus,
.add-task-input:active {
  border-bottom: 1px solid black;
}
.add-task-input {
  outline: none;
  padding: .5em;
    background: transparent;
    border: none;
    border-bottom: 1px transparent
}

.task-desc {
  color: gray;
    font-size: .8rem;
    margin: 0;
}

</style>
