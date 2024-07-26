// /* eslint-disable import/no-unresolved */
// Styles
// import '@mdi/font/css/materialdesignicons.css'
// import 'material-icons/iconfont/material-icons.css'
import 'vuetify/styles';
import { md } from 'vuetify/iconsets/md';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Vuetify
import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labs from 'vuetify/labs/components';
/*
  사용중인 icon URL

  default icon: https://fonts.google.com/icons?selected=Material+Icons
  mdi icon: https://pictogrammers.com/library/mdi/
*/

export default createVuetify({
  directives,
  components: {
    ...components,
    ...labs
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      md,
      mdi
    }
  },
  theme: true
});
