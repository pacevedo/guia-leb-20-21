<template>
  <div class="home">
    <v-container class="ma-1 pa-1">
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <Group conference="Oeste"/>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <Group conference="Este"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Group from '@/components/Group.vue'

export default {
  name: 'Home',
  components: {
    Group
  }
}
</script>
<style lang="scss">
  .container {
    display: flex;
    align-items: flex-start;
    margin: 10px;
    flex-wrap: wrap
  }
</style>