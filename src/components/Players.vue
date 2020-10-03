<template>
  <div class="player-list">
    <v-card>
      <v-card-title>
        Jugadores
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="playerList"
        :search="search"
        :items-per-page="itemsPerPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        dense
        :footer-props="{
          itemsPerPageOptions: [50, 100, -1]
        }"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.idPlayer"
            >
              <td class="text-start">{{ item.position }}</td>
              <td class="text-start"><a :href="`/player/${item.idTeam}/${item.idPlayer}`">{{ item.namePlayer }}</a></td>
              <td class="text-start">{{ item.nameTeam}}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>

export default {
  name: 'Players',
  data () {
    return {
      search: '',
      sortBy: 'namePlayer',
      sortDesc: false,
      headers: [
          { text: 'Pos.', value: 'position', width: '70px'},
          { text: 'Jugador', value: 'namePlayer', width: '150px' },
          { text: 'Equipo', value: 'nameTeam', width: '220px' }
      ],
      players: require('../assets/players.json'),
      playerList: [],
      itemsPerPage: 50,
    }
  },
  mounted () {
    this.players.forEach(team => {
      team.players.forEach(player => {
        const element = {
          position: player.position,
          namePlayer: player.name,
          nameTeam: team.team,
          idPlayer: player.id,
          idTeam: team.id
        }
        this.playerList.push(element)
      })
    })
    const teams = this.players.filter(team => team.id === this.$route.params.team)
    if (teams.length === 1) {
      this.team = teams[0]
      this.coach = this.team.coach
      this.lastSeasonCoach = this.coach.lastSeason
      this.teamPlayers = this.team.players
    }
  }
}
</script>
