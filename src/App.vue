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
        <v-row justify="center">
          <v-btn
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
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-row>

        <transition-group name="rowTransition" tag="">
          <v-row class="d-inline-flex" v-for="(bar, id) in bars" :key="id">
            <small>{{ bar }}</small>
              <v-btn
                color="error"
                elevation="2"
                fab
                small
                @click="bars.splice(id, 1)"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              <v-progress-linear
              class="d-inline-flex"
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
                  <strong> {{ Math.ceil(bar.percent) }}%</strong>
                </template>
              </v-progress-linear>

            <span>{{ bar.text }}</span>
          </v-row>
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
  methods: {
  },
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