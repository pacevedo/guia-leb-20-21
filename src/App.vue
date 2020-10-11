<template>
  <v-app>
    <div id="app" :style="{background: $vuetify.theme.themes[theme].background}">
      <div class="logo"><img alt="LEB Oro" src="./assets/leboro.jpg" width="64px"></div>
      <div id="nav">
        <router-link to="/">Equipos</router-link> |
        <router-link to="/players">Jugadores</router-link> |
        <router-link to="/comparator">Comparador</router-link> |
        <router-link to="/standings">Pretemporada</router-link>
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),

  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // a {
  //   color: #2c3e50 !important;
  // }
}
.logo {
  text-align: center;
  margin: 5px;
}
#nav {
  text-align: center;
  font-size: 14px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
