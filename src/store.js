import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'   // plugin (funkcia ktora oboznamuje state o zmenach na boarde)
Vue.use(Vuex)

// aby nas akutalny board s datami ostal aj po refreshi, pozrieme sa ci je ulozeny v localStorage
// a ak nie je tak nacitame zaciatocny defaultny board

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK( state, { taskList, name } ) {
      taskList.push({
        name,                           //name: name
        id: uuid(),                     // funkcia z utils(unikatne IDcko)
        description: ''
      })
    },

    CREATE_COLUMN( state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },

    UPDATE_TASK( state, { task, key, value}) {
      task[key] = value
    },

      /**
       * fromTasklist - dany tasklist Z ktoreho berieme task
       * toTaskList - dany tasklist KDE kladame task
       * fromTaskIndex - povodne umiestnenie(index) tasku kt prenasame
       * toTaskIndex - konecne miesto(index) kde dropujeme task
       */
    MOVE_TASK( state, { fromTaskList, toTaskList, fromTaskIndex, toTaskIndex }) {

      const taskToMove = fromTaskList.splice( fromTaskIndex, 1 )[0]  
      toTaskList.splice(toTaskIndex, 0, taskToMove)
    },

    MOVE_COLUMN( state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const colToMove = columnList.splice( fromColumnIndex, 1)[0]

      columnList.splice(toColumnIndex, 0, colToMove)
    }

  },
  
  getters: { 
     // vracia funkciu kt pozaduje id argument na vyhladanie spraveho eventu
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  }
})
 