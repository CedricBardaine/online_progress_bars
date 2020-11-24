<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1 v-show="!$vuetify.breakpoint.xs">Online Progress bars</h1>
        <h3 v-show="$vuetify.breakpoint.xs">Online Progress bars</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/CedricBardaine" target="_blank" text>
        <span class="mr-2">{{
          $vuetify.breakpoint.xs ? "CB" : "CedricBardaine"
        }}</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      {{ $vuetify.breakpoint.name }}

      <!--
      <v-row>
        <v-row class="divLeft col-2" align="center" justify="center"> gauche </v-row>
        <v-row class="divMiddle col-8" align="center" justify="center"> milieu </v-row>
        <v-row class="divRight col-2" align="center" justify="center"> droite </v-row>
      </v-row>
      -->

      <v-container>
        <v-container class="">
          <v-row class="pb-8 mx-2">
            <v-row align="center" justify="start">
              <v-btn
                class="mr-2"
                color="secondary"
                elevation="2"
                fab
                @click="sortById()"
              >
                <v-icon dark> mdi-filter-variant </v-icon>
              </v-btn>

              <v-btn
                class="mr-2"
                color="primary"
                elevation="2"
                fab
                @click="
                  bars.push({
                    text: 'test',
                    percent: 0,
                    loading: false,
                    paused: false,
                    problem: false,
                  })
                "
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-row>
            <v-row align="center" justify="end">
              <h1>{{ totalPercent }}%</h1></v-row
            >
          </v-row>
        </v-container>

        <transition-group name="rowTransition" tag="">
          <div class="pb-2" v-for="(bar, id) in bars" :key="id">
            <v-row justify="center" class="">
              <v-row class="col-3" justify="center" align="center">
                <v-btn
                  color="error"
                  elevation="2"
                  fab
                  small
                  @click="bars.splice(id, 1)"
                >
                  <v-icon dark> mdi-close </v-icon>
                </v-btn>
              </v-row>
              <v-row class="col-6" justify="center" align="center">
                <v-progress-linear
                  ref="progressBar"
                  class=" "
                  height="30"
                  :color="
                    bar.paused
                      ? 'grey darken-1'
                      : bar.problem
                      ? 'red darken-1'
                      : 'blue darken-1'
                  "
                  :background-color="
                    bar.paused
                      ? 'grey lighten-4'
                      : bar.problem
                      ? 'red lighten-4'
                      : 'blue lighten-4'
                  "
                  rounded
                  @change="vPLchangement(id, $event)"
                >
                  <template
                    v-slot:default="{
                      /* value */
                    }"
                  >
                    <strong> {{ Math.floor(bar.percent) }}%</strong>
                  </template>
                </v-progress-linear>
              </v-row>
              <v-row class="col-3" justify="center" align="center">
                <v-btn
                  class="mr-1"
                  :color="bar.percent == 100 ? 'primary' : ''"
                  :elevation="bar.percent == 100 ? '0' : '2'"
                  fab
                  x-small
                  @click="
                    bar.percent = 100;
                    $refs.progressBar[id].internalLazyValue = 100;
                  "
                >
                  <v-icon dark> mdi-check </v-icon>
                </v-btn>
                <v-btn
                  class="mr-1"
                  :color="bar.paused ? 'primary' : ''"
                  elevation="2"
                  fab
                  x-small
                  @click="bar.paused = !bar.paused"
                >
                  <v-icon dark> mdi-hand-left </v-icon>
                </v-btn>
                <v-btn
                  class="mr-1"
                  :color="bar.problem ? 'error' : ''"
                  elevation="2"
                  fab
                  x-small
                  @click="bar.problem = !bar.problem"
                >
                  <v-icon dark> mdi-exclamation </v-icon>
                </v-btn>
              </v-row>
            </v-row>

            <v-row justify="center">
              <v-row class="col-3"></v-row>
              <v-row class="col-6" justify="center" align="center">
                <v-text-field
                  class=""
                  type="text"
                  error-count=""
                  placeholder=""
                  label=""
                  v-model="bar.text"
                  dense
                ></v-text-field>
              </v-row>
              <v-row class="col-3"></v-row>
            </v-row>
          </div>
        </transition-group>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    bars: [
      {
        text: "test",
        percent: 0,
        loading: false,
        paused: false,
        problem: false,
      },
      {
        text: "test 2 assez long niveau phrase quoi ",
        percent: 10,
        loading: false,
        paused: false,
        problem: false,
      },
    ],
  }),
  computed: {
    totalPercent() {
      if (this.bars.length == 0) return 0;
      let sumTot = 0;
      this.bars.forEach((element) => {
        sumTot += element.percent;
      });
      return Math.floor(sumTot / this.bars.length);
    },
  },
  methods: {
    vPLchangement(index, event) {
      if (!this.bars[index].paused) {
        this.bars[index].percent = event;
        this.$refs.progressBar[index].internalLazyValue = event;
      } else {
        // this.$refs.progressBar[index].internalLazyValue = this.bars[index].percent;
      }

      this.updateVPL();
    },

    displayAllBars() {
      this.bars.forEach((element) => {
        console.log(element.percent);
      });
    },

    sortById() {
      console.log("sort");
      this.bars = this.bars.sort((e1, e2) => {
        if (e1.percent > e2.percent) return -1;
        else return 1;
      });

      this.updateVPL();
    },

    updateVPL() {
      for (let i = 0; i < this.bars.length; i++) {
        this.$refs.progressBar[i].internalLazyValue = this.bars[i].percent;
      }
    },
  },
  watch: {},
};
</script>

<style >
.rowTransition-enter-active,
.rowTransition-leave-active {
  transition: opacity 0.5s;
}
.rowTransition-enter, .rowTransition-leave-to /* .rowTransition-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>