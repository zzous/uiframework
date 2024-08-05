// // /* eslint-disable import/no-unresolved */
// // Styles
// // import '@mdi/font/css/materialdesignicons.css'
// // import 'material-icons/iconfont/material-icons.css'
// import 'vuetify/styles';
// import { md } from 'vuetify/iconsets/md';
// import { aliases, mdi } from 'vuetify/iconsets/mdi';

// // Vuetify
// import { createVuetify } from 'vuetify';

// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
// import * as labs from 'vuetify/labs/components';
// /*
//   사용중인 icon URL

//   default icon: https://fonts.google.com/icons?selected=Material+Icons
//   mdi icon: https://pictogrammers.com/library/mdi/
// */

// export default createVuetify({
//   directives,
//   components: {
//     ...components,
//     ...labs
//   },
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       md,
//       mdi
//     }
//   },
//   theme: true
// });

import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export const vPaginationItemsPerPage = 10;

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {variant: 'default'},
    VTextField: {variant: 'outlined', hideDetails: 'auto', density: 'comfortable'},
    VSelect: {variant: 'outlined', hideDetails: 'auto', density: 'comfortable'},
    VDataTable: {hideDefaultFooter: true, noDataText: '데이터가 존재하지 않습니다.'},
    VPagination: {variant: 'flat', totalVisible: vPaginationItemsPerPage, size: 'small', rounded: 'circle', activeColor: '#1297F2'}
  }
});

export default vuetify;
