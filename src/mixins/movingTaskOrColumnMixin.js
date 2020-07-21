export default { 
    props: {
        board: {
            type: Object,
            required: true
        },

        column: {
            type: Object,
            required: true
        },
        columnIndex: {
            type: Number,
            required: true
        }
    },

    methods: { 
    
    /**
     * metoda, ktora rozlisuje ci hybeme a pustame task alebo cely column
     * - DROPTASK - ak index kde droppujeme task je undefined( nedropuje task na iny task ale na column ako celok)
     *  tak dany task pripojime len k listu ...inak ho pripojime na dany index
     */
    dropTaskOrColumn(e, toTaskList, toColumnIndex, toTaskIndex ) {
        const type = e.dataTransfer.getData('type')
        if( type === 'task') {
        this.dropTask(e, toTaskList, 
        toTaskIndex !== undefined ? toTaskIndex : toTaskList.length)

        } else {
        this.dropColumn(e, toColumnIndex)
    }
},

dropColumn(e, toColumnIndex ) {
    // index columnu kt chceme preniest 
    const fromColumnIndex = e.dataTransfer.getData('column-index')
    
    this.$store.commit('MOVE_COLUMN', {
    fromColumnIndex,
    toColumnIndex
    })
}, 

  // defaultny event a list s Taskami KDE chceme dropnut task
  dropTask(e, toTaskList, toTaskIndex ) {
    const fromColIndex = e.dataTransfer.getData('from-col-index')

    const fromTaskList = this.board.columns[fromColIndex].tasks  
    const fromTaskIndex = e.dataTransfer.getData('from-task-index')

    this.$store.commit('MOVE_TASK', {
        fromTaskList,     // pole Tasklist Z ktoreho tahame task
        fromTaskIndex,    // index tasku pri zacati tahania
        toTaskList,       // pole TaskList KDE tahame task
        toTaskIndex       // na ktory index dropujeme tahany task
    })
},
    }
}