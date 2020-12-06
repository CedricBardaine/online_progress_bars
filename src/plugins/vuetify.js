import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#669C5E',
        secondary: '#E8A90C',
      },
      dark: {
        primary: '#669C5E',
        secondary: '#E8A90C',
      },
    },
  },
})
