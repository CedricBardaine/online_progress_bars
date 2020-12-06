
<template>
  <!--
      <v-row>
        <v-row class="divLeft col-2" align="center" justify="center"> gauche </v-row>
        <v-row class="divMiddle col-8" align="center" justify="center"> milieu </v-row>
        <v-row class="divRight col-2" align="center" justify="center"> droite </v-row>
      </v-row>
      -->

  <v-container>
    <!-- // TODO: display valert on url copy -->
    <v-container class="">
      <v-row class="pb-8 mx-2">
        <v-row align="center" justify="start">
          <v-btn
            class="mr-2"
            color="secondary"
            elevation="2"
            @click="chooseSort()"
          >
            <v-icon dark> mdi-filter-variant </v-icon>
            <span class="mx-1"> : </span>
            <v-icon v-show="sorted == 'text'">mdi-format-title</v-icon>
            <v-icon v-show="sorted == 'percent'">mdi-percent</v-icon>
            <v-icon v-show="sorted == 'problem'">mdi-exclamation-thick</v-icon>
            <v-icon v-show="sorted == ''"> mdi-help </v-icon>
          </v-btn>

          <v-btn class="mr-2" color="primary" elevation="2" @click="addBar()">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>

          <v-btn
            class="mr-2"
            color="primary"
            elevation="2"
            @click="
              $router.push({
                path: '',
                query: { data: JSON.stringify(bars) },
              });
            "
          >
            <v-icon dark> mdi-content-save </v-icon>
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
              :disabled="bar.paused"
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
              placeholder="Nom de tâche"
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
</template>


<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    bars: [
      {
        text: "",
        percent: 0,
        loading: false,
        paused: false,
        problem: false,
      },
    ],
    sorted: "", // 'percent', 'text', 'problem'
    dontReWatch: false, // used to prevent the watch to always set sorted to '' because of the sort fcts.
  }),
  mounted() {
    let self = this;

    // If there is a query param 'data', it initialise the this.data.
    if (this.$route.query.data) {
      this.bars = JSON.parse(this.$route.query.data);
    }

    setTimeout(function () {
      self.updateVPL();
    }, 100);
  },
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
    /**
     * Create a DOM element and copy it
     * @see https://stackoverflow.com/a/49618964/13880103
     */
    copyFullURLToClipboard() {
      var dummy = document.createElement("input"),
        text = window.location.href;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
    addBar() {
      this.bars.push({
        text: "",
        percent: 0,
        loading: false,
        paused: false,
        problem: false,
      });
      this.sorted = "";
    },
    vPLchangement(index, event) {
      if (!this.bars[index].paused) {
        this.bars[index].percent = event;
        this.$refs.progressBar[index].internalLazyValue = event;
      } else {
        // this.$refs.progressBar[index].internalLazyValue = this.bars[index].percent;
      }

      this.updateVPL();
    },

    sortByPercent() {
      this.bars = this.bars.sort((e1, e2) => {
        if (e1.percent > e2.percent) return -1;
        else return 1;
      });
      this.sorted = "percent";
      this.updateVPL();
    },
    sortByText() {
      this.bars = this.bars.sort((e1, e2) => {
        if (e1.text < e2.text) return -1;
        else return 1;
      });
      this.sorted = "text";
      this.updateVPL();
    },
    sortByProblem() {
      this.bars = this.bars.sort((e1, e2) => {
        Object.values(e2);
        if (e1.problem) return -1;
        else return 1;
      });
      this.sorted = "problem";
      this.updateVPL();
    },

    chooseSort() {
      this.dontReWatch = true;
      switch (this.sorted) {
        case "percent":
          // console.log("text sort");
          this.sortByText();
          break;
        case "text":
          // console.log("problem sort");
          this.sortByProblem();
          break;
        case "problem":
          // console.log("% sort");
          this.sortByPercent();
          break;
        default:
          // console.log("% sort (default");
          this.sortByPercent();
          break;
      }
    },

    /**
     * Refresh the VProgressBar component background color.
     */
    updateVPL() {
      for (let i = 0; i < this.bars.length; i++) {
        this.$refs.progressBar[i].internalLazyValue = this.bars[i].percent;
      }
    },
  },
  watch: {
    bars: {
      handler: function (/*newVal, oldVal*/) {
        // console.log(
        //   "CHANGE!",
        //   JSON.parse(JSON.stringify(oldVal)) !=
        //     JSON.parse(JSON.stringify(newVal))
        // );

        // this.$router.query = JSON.stringify(newVal);

        if (this.dontReWatch) {
          this.dontReWatch = false;
        } else {
          this.sorted = "";
        }
      },
      deep: true,
    },
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