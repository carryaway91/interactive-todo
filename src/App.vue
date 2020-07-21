<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
}
}
</script>

<style>
body, ul, li {
  margin: 0;
  padding: 0;
}
*, *:before, *:after {
  box-sizing: border-box
}


body { 
  background-color: #2c3e50;
  position: relative;
  height: 100vh;
  width: 100%;
}

li {
  list-style-type: none;
}

#app {
  padding: 2em;
  height: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
