export function uuid () {
  return Math.random().toString(16).slice(2)
}

// ak sa zmeni nieco vo VUEX store tak upovedomme localStorage
export function saveStatePlugin (store) {
  store.subscribe(
    (mutation, state) => localStorage.setItem('board', JSON.stringify(state.board))
  )
}
