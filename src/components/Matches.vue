<template>
  <div>
    <div class="match-list">
      <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="td-date">Fecha</th>
                <th class="td-team-preseason">Local</th>
                <th class="td-score">Result.</th>
                <th class="td-team-preseason">Visitante</th>
                <th class="td-location">Ubicación</th>
                <th>Vídeo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="match in matches" :key="match.date">
                <td class="td-date">{{match.date}}</td>
                <td :class="getClass(match, true)">{{getTeam(match.local)}}</td>
                <td class="td-score"><a :href="match.url" target="_blank">{{match.scoreLocal}} - {{match.scoreVisit}}</a></td>
                <td :class="getClass(match, false)">{{getTeam(match.visit)}}</td>
                <td class="td-location">{{match.location}}</td>
                <td>
                  <a v-if="match.video !== ''" :href="match.video" target="_blank">
                    <img src="../assets/video.png" height="20px" />
                  </a>
                  </td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
    </div>
    <div class="standings">
      <h4>Total</h4>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="td-games">V</th>
              <th class="td-games">D</th>
              <th class="td-points">PF</th>
              <th class="td-points">PC</th>
              <th class="td-points-per-game">PPF</th>
              <th class="td-points-per-game">PPC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-games">{{getWins()}}</td>
              <td class="td-games">{{getLosses()}}</td>
              <td class="td-points">{{getPoints(true)}}</td>
              <td class="td-points">{{getPoints(false)}}</td>
              <td class="td-points-per-game">{{getPointsPerGame(true)}}</td>
              <td class="td-points-per-game">{{getPointsPerGame(false)}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Matches',
  props: {
    matches: Array,
    team: String
  },
  data () {
    return {
      players: require('../assets/players.json'),
    }
  },
  methods: {
    getTeam(team) {
      if (isNaN(team)) {
        return team;
      } else {
        const teams = this.players.filter(item => item.id === team)
        if (teams.length === 1) {
          return teams[0].team
        }
      }
    },
    getClass(match, isLocal){
      const {scoreLocal, scoreVisit} = match
      let tdClass = "td-team-preseason "
      if (isLocal) {
        tdClass += scoreLocal > scoreVisit ? "winner" : ""
      } else {
        tdClass += scoreLocal < scoreVisit ? "winner" : ""
      }
      return tdClass
    },
    getWins() {
      const idTeam = this.team
      return this.matches.reduce((acum,match) => { 
        const {scoreLocal, scoreVisit} = match
        const isWin = (match.local === idTeam && scoreLocal > scoreVisit) || 
        (match.visit === idTeam && scoreLocal < scoreVisit)
        return acum + isWin*1
      }, 0)
    },
    getLosses() {
      return this.matches.length - this.getWins()
    },
    getPoints(favor) {
      const idTeam = this.team
      return this.matches.reduce((acum, match) => {
        const {scoreLocal, scoreVisit} = match
        let score = 0;
        if (favor) {
          score = match.local === idTeam ? scoreLocal : scoreVisit
        } else {
          score = match.local === idTeam ? scoreVisit : scoreLocal
        }
        return acum + score
      }, 0)
    },
    getPointsPerGame(favor) {
      return (this.getPoints(favor) / this.matches.length).toFixed(2)
    }
  }
}
</script>