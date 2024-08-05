
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'; // Pinia

import App from './App.vue';
import router from './router';
import VueUniversalModal from 'vue-universal-modal';
import VueDatePicker from '@vuepic/vue-datepicker';
import PageNavigation from '@/components/PageNavigation.vue';
import CardBox from '@/components/CardBox.vue';
import BarChart from '@/components/BarChart.vue';
import BarChartHor from '@/components/BarChartHor.vue';
import donutChart from '@/components/donutChart.vue';
import $Modal from '@/plugins/modal';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import '@/plugins/toasted';
import 'vue3-toastify/dist/index.css';
/** @emitter */
import eventBus from '@/core/eventBus';
window.emitter = eventBus;
/** @moment */
import dayjs from 'dayjs';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueUniversalModal, { teleportTarget: '#modals' });
app.use(dayjs);
app.use(i18n);
app.provide('$Modal', $Modal);
app.provide('dayJS', dayjs);
app.use(vuetify);
app.use(Carousel);
app.component('DatePicker', VueDatePicker);
app.component('PageNavigation', PageNavigation);
app.component('CardBox', CardBox);
app.component('BarChart', BarChart);
app.component('BarChartHor', BarChartHor);
app.component('donutChart', donutChart);
app.component('Carousel', Carousel);
app.component('Slide', Slide);
app.component('Navigation', Navigation);
app.component('Pagination', Pagination);
app.mount('#app');
