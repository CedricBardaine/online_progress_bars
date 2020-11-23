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

      <v-container>
        <v-row class="pb-8">
          <v-row >
            <v-row justify="start" align="center" >
              <v-btn
                class="mr-2"
                color="secondary"
                elevation="2"
                fab
                @click="
                  bars.push({
                    text: 'test',
                    percent: 0,
                    loading: false,
                    disabled: false,
                    problem: false,
                  })
                "
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
                    disabled: false,
                    problem: false,
                  })
                "
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-row>
          </v-row>
          <v-row align="center" justify="end"> {{ totalPercent }}% </v-row>
        </v-row>

        <transition-group name="rowTransition" tag="">
          <div class="pb-2" v-for="(bar, id) in bars" :key="id">
            <v-row>
              <v-row
                class="col-3 col-md-2 flex-shrink-0"
                justify="center"
                align="center"
              >
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
              <v-row
                class="col-9 col-md-10 flex-shrink-1"
                justify="center"
                align="center"
              >
                <v-progress-linear
                  class=" "
                  v-model="bar.percent"
                  height="30"
                  color="blue darken-1"
                  background-color="blue lighten-4"
                  rounded
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
            </v-row>
            <v-row class="" justify="center" align="center">
              <v-text-field
                class="px-4 px-sm-12"
                type="text"
                error-count=""
                placeholder=""
                label=""
                prepend-icon="mdi-format-title"
                v-model="bar.text"
              ></v-text-field>
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
        disabled: false,
        problem: false,
      },
      {
        text: "test 2 assez long niveau phrase quoi ",
        percent: 10,
        loading: false,
        disabled: false,
        problem: false,
      },
    ],
  }),
  computed: {
    totalPercent() {
      let sumTot = 0;
      this.bars.forEach((element) => {
        sumTot += element.percent;
      });
      return Math.floor(sumTot / this.bars.length);
    },
  },
  methods: {},
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