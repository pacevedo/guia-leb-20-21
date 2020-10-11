<template>
  <div class="team">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-btn
              color="primary"
              @click="goBack"
              right
              absolute
            >Volver
          </v-btn>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <img class="logo-big" :src="getLogo()"/>
          <h2>{{ team.team }}</h2>
          <div class="coach">
            <label>Entrenador: </label>{{ coach.name }} ({{ getYearsOld(coach.bornDate)}} años)
            <img class="flag-small" :src="getFlag(coach.nationality)" :alt="coach.nationality"/>
            <div class="last-season">
              <label>19/20: </label>{{ lastSeasonCoach.team }} <span v-if="lastSeasonCoach.category !== ''">({{ lastSeasonCoach.category }}
              <img class="flag-small" :src="getFlag(lastSeasonCoach.country)" :alt="lastSeasonCoach.country"/>)
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="players">
      <v-expansion-panels :value="0">
        <v-expansion-panel>
          <v-expansion-panel-header>Jugadores</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center width-50">Pos.</th>
                    <th class="text-center width-50">Dorsal</th>
                    <th class="text-left">Jugador</th>
                    <th class="text-left width-130">Nacionalidad</th>
                    <th class="text-left width-50">Edad</th>
                    <th class="text-left width-50">Altura</th>
                    <th class="text-left width-100">Temp. LEB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in teamPlayers" :key="player.name">
                    <td class="text-center">{{ player.position }}</td>
                    <td class="text-center">{{ player.number }}</td>
                    <td><a :href="getLinkPlayer(player.id)">{{ getShortName(player.name) }}</a></td>
                    <td>
                      <img class="flag-small" :src="getFlag(getNationality(player.nationality,1))" :alt="getNationality(player.nationality,1)"/> 
                      <span v-if="hasDoubleNationality(player.nationality)"> / 
                        <img class="flag-small" :src="getFlag(getNationality(player.nationality,2))" :alt="getNationality(player.nationality,2)"/>
                      </span>
                    </td>
                    <td>{{ getYearsOld(player.bornDate) }}</td>
                    <td>{{ player.height.toFixed(2) }}</td>
                    <td class="text-center">{{ player.yearsLEB }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Pretemporada</v-expansion-panel-header>
          <v-expansion-panel-content>
            <Matches :matches="matches" :team="team.id" :showTotal="true"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Totales 19/20</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="td-pos">Pos.</th>
                    <th class="td-name">Jugador</th>
                    <th class="td-team">Equipo</th>
                    <th class="td-matches">Part.</th>
                    <th class="td-total-minutes">Min.</th>
                    <th class="td-stat">Ptos</th>
                    <th class="td-stat">Rebs</th>
                    <th class="td-stat">Asis</th>
                    <th class="td-percentage">T2</th>
                    <th class="td-percentage">T3</th>
                    <th class="td-percentage">TL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in teamPlayers" :key="player.name">
                    <td class="td-pos">{{ player.position }}</td>
                    <td class="td-name"><a :href="getLinkPlayer(player.id)">{{ getShortName(player.name) }}</a></td>
                    <td class="td-team">
                      {{ player.lastSeason.team }}
                      <span v-if="player.lastSeason.category !== ''">
                        ({{player.lastSeason.category}}
                        <img class="flag-xsmall" :src="getFlag(player.lastSeason.country)" :alt="player.lastSeason.country"/>) 
                      </span>
                    </td>
                    <td class="td-matches">{{ player.lastSeason.matches }}</td>
                    <td class="td-minutes">{{ getTotalMinutes(player.lastSeason.mins, player.lastSeason.matches) }}</td>
                    <td class="td-stat">{{ player.lastSeason.points }}</td>
                    <td class="td-stat">{{ player.lastSeason.rebounds }}</td>
                    <td class="td-stat">{{ player.lastSeason.assists }}</td>
                    <td class="td-percentage">{{ getRatio(player.lastSeason['2PM'], player.lastSeason['2PA']) }}</td>
                    <td class="td-percentage">{{ getRatio(player.lastSeason['3PM'], player.lastSeason['3PA']) }}</td>
                    <td class="td-percentage">{{ getRatio(player.lastSeason.FTM, player.lastSeason.FTA) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Promedios 19/20</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="td-pos">Pos.</th>
                    <th class="td-name">Jugador</th>
                    <th class="td-team">Equipo</th>
                    <th class="td-matches">Part.</th>
                    <th class="td-minutes">Min.</th>
                    <th class="td-stat">Ptos</th>
                    <th class="td-stat">Rebs</th>
                    <th class="td-stat">Asis</th>
                    <th class="td-percentage">T2</th>
                    <th class="td-percentage">T3</th>
                    <th class="td-percentage">TL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in teamPlayers" :key="player.name">
                    <td class="td-pos">{{ player.position }}</td>
                    <td class="td-name"><a :href="getLinkPlayer(player.id)">{{ getShortName(player.name) }}</a></td>
                    <td class="td-team">
                      {{ player.lastSeason.team }}
                      <span v-if="player.lastSeason.category !== ''">
                        ({{player.lastSeason.category}}
                        <img class="flag-xsmall" :src="getFlag(player.lastSeason.country)" :alt="player.lastSeason.country"/>) 
                      </span>
                    </td>
                    <td class="td-matches">{{ player.lastSeason.matches }}</td>
                    <td class="td-minutes">{{ player.lastSeason.mins }}</td>
                    <td class="td-stat">{{ getPerGame(player.lastSeason.points, player.lastSeason.matches) }}</td>
                    <td class="td-stat">{{ getPerGame(player.lastSeason.rebounds, player.lastSeason.matches) }}</td>
                    <td class="td-stat">{{ getPerGame(player.lastSeason.assists, player.lastSeason.matches) }}</td>
                    <td class="td-percentage">{{ getRatioPerGame(player.lastSeason['2PM'], player.lastSeason['2PA'], player.lastSeason.matches) }}</td>
                    <td class="td-percentage">{{ getRatioPerGame(player.lastSeason['3PM'], player.lastSeason['3PA'], player.lastSeason.matches) }}</td>
                    <td class="td-percentage">{{ getRatioPerGame(player.lastSeason.FTM, player.lastSeason.FTA, player.lastSeason.matches) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Por 40 minutos 19/20</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="td-pos">Pos.</th>
                    <th class="td-name">Jugador</th>
                    <th class="td-team">Equipo</th>
                    <th class="td-stat">Ptos</th>
                    <th class="td-stat">Rebs</th>
                    <th class="td-stat">Asis</th>
                    <th class="td-percentage">T2</th>
                    <th class="td-percentage">T3</th>
                    <th class="td-percentage">TL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in teamPlayers" :key="player.name">
                    <td class="td-pos">{{ player.position }}</td>
                    <td class="td-name"><a :href="getLinkPlayer(player.id)">{{ getShortName(player.name) }}</a></td>
                    <td class="td-team">
                      {{ player.lastSeason.team }}
                      <span v-if="player.lastSeason.category !== ''">
                        ({{player.lastSeason.category}}
                        <img class="flag-xsmall" :src="getFlag(player.lastSeason.country)" :alt="player.lastSeason.country"/>) 
                      </span>
                    </td>
                    <td class="td-stat">{{ getPerMins(player.lastSeason.points, player.lastSeason.mins, player.lastSeason.matches) }}</td>
                    <td class="td-stat">{{ getPerMins(player.lastSeason.rebounds, player.lastSeason.mins, player.lastSeason.matches) }}</td>
                    <td class="td-stat">{{ getPerMins(player.lastSeason.assists, player.lastSeason.mins, player.lastSeason.matches) }}</td>
                    <td class="td-percentage">{{ getRatioPerMins(player.lastSeason['2PM'], player.lastSeason['2PA'], player.lastSeason.mins, player.lastSeason.matches) }}</td>
                    <td class="td-percentage">{{ getRatioPerMins(player.lastSeason['3PM'], player.lastSeason['3PA'], player.lastSeason.mins, player.lastSeason.matches) }}</td>
                    <td class="td-percentage">{{ getRatioPerMins(player.lastSeason.FTM, player.lastSeason.FTA, player.lastSeason.mins, player.lastSeason.matches) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Estadísticas avanzadas de tiro 19/20</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="td-pos">Pos.</th>
                    <th class="td-name">Jugador</th>
                    <th class="td-team">Equipo</th>
                    <th class="td-stat">eFG%</th>
                    <th class="td-stat">TS%</th>
                    <th class="td-stat">3PAr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in teamPlayers" :key="player.name">
                    <td class="td-pos">{{ player.position }}</td>
                    <td class="td-name"><a :href="getLinkPlayer(player.id)">{{ getShortName(player.name) }}</a></td>
                    <td class="td-team">
                      {{ player.lastSeason.team }}
                      <span v-if="player.lastSeason.category !== ''">
                        ({{player.lastSeason.category}}
                        <img class="flag-xsmall" :src="getFlag(player.lastSeason.country)" :alt="player.lastSeason.country"/>) 
                      </span>
                    </td>
                    <td class="td-stat">{{getEFG(player.lastSeason)}}</td>
                      <td class="td-stat">{{getTS(player.lastSeason)}}</td>
                      <td class="td-stat">{{get3Par(player.lastSeason)}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
<script>
import Util from '@/components/util.js'
import PlayerService from '@/components/PlayerService.js'
import Matches from '@/components/Matches.vue'

export default {
  name: 'Team',
  components: {
    Matches
  },
  data () {
    return {
      countries: require('../assets/countries.json'),
      players: require('../assets/players.json'),
      preseason: require ('../assets/preseason.json'),
      team: {},
      coach: {},
      lastSeasonCoach: {},
      teamPlayers: [],
      tab: null,
      matches: []
    }
  },
  methods: {
    getLogo (){
      if (this.team.logo !== undefined) {
        return require('../assets/logos/'+this.team.logo)
      } else {
        return ''
      }
    },
    getYearsOld (bornDate) {
      return (bornDate !== undefined) ? Util.getYearsOld(bornDate) : 0
    },
    getNationality (nationality, index) {
      return PlayerService.getNationality(nationality,index)
    },
    hasDoubleNationality (nationality) {
      return PlayerService.hasDoubleNationality(nationality)
    },
    getFlag (nationality){
      return PlayerService.getFlag(nationality, this.countries)
    },
    getTotalMinutes (mins, matches) {
      return PlayerService.getTotalMinutes(mins, matches)
    },
    getRatio(made, attempted) {
      return PlayerService.getRatio(made, attempted, true)
    },
    getPerGame(element, matches) {
      if (matches > 0) {
        return (element/matches).toFixed(2)
      } else {
        return (element !== undefined) ? 0 : ''
      }
    },
    getPerMins(element, mins, matches) {
      return PlayerService.getElementPer40Minutes(element, mins, matches)
    },
    getRatioPerGame (made, attempted, matches) {
      return PlayerService.getRatioPerGame(made, attempted, matches, true)
    },
    getRatioPerMins (made, attempted, mins, matches) {
      return PlayerService.getRatioPer40Minutes(made, attempted, mins, matches, true)
    },
    getLinkPlayer (id) {
      return '/player/' + this.team.id + '/' + id
    },
    getEFG (stats) {
      if (stats['2PA'] +  stats['3PA'] > 0) {
        return PlayerService.getEFG(stats['2PM'], stats['3PM'], stats['2PA'], stats['3PA']) + ' %'
      } else {
        return ''
      }
    },
    getTS (stats){
      if (stats['2PA'] +  stats['3PA'] + stats['FTA'] > 0) {
        return PlayerService.getTS(stats.points, stats['2PA'], stats['3PA'], stats['FTA']) + ' %'
      } else {
        return ''
      }
    },
    get3Par (stats) {
      if (stats['2PA'] +  stats['3PA'] > 0) {
        return PlayerService.get3Par(stats['2PA'], stats['3PA']) + ' %'
      } else {
        return ''
      }
    },
    getShortName(name) {
      let parts = name.split (" ")
      const firstName = parts[0]
      parts.shift()
      return firstName.charAt(0)+". "+parts.join(" ")
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted () {
    const teams = this.players.filter(team => team.id === this.$route.params.team)
    if (teams.length === 1) {
      this.team = teams[0]
      this.coach = this.team.coach
      this.lastSeasonCoach = this.coach.lastSeason
      this.teamPlayers = this.team.players
      this.matches = this.preseason.filter(match => (match.local === this.team.id  || match.visit === this.team.id))
    }
  }
}
</script>