<template>
  <div class="conference">
    <h2>Grupo {{ conference }}</h2>
    <table>
      <tr class="team-row" v-for="team in getTeams()" :key="team.team">
        <td><img class="logo-small" :src="getLogo(team)" @click="goToTeam(team)"/></td>
        <td><a :href="`/team/${team.id}`">{{team.team}}</a></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Group',
  props: {
    conference: String
  },
  data () {
    return {
      players: require('../assets/players.json')
    }
  },
  methods: {
    getTeams (){
      return this.players.filter(team => team.conference === this.conference)
    },
    getLogo (team){
      return require('../assets/logos/'+team.logo)
    },
    goToTeam (team){
      location.href = '/team/'+team.id
    }
  }
}
</script>
