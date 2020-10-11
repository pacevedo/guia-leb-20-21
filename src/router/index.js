import Vue from 'vue'
import VueRouter from 'vue-router'

import Comparator from '../components/Comparator.vue'
import Home from '../views/Home.vue'
import Player from '../components/Player.vue'
import Players from '../components/Players.vue'
import Standings from '../components/Standings.vue'
import Team from '../components/Team.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/players',
    name: 'Players',
    component: Players
  },
  {
    path: '/team/:team',
    name: 'Team',
    component: Team
  },
  {
    path: '/player/:team/:player',
    name: 'Player',
    component: Player
  },
  {
    path: '/comparator',
    name: 'Comparator',
    component: Comparator
  },
  {
    path: '/standings',
    name: 'Standings',
    component: Standings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
