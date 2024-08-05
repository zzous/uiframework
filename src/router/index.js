import { createRouter, createWebHistory } from 'vue-router';
const withPrefix = (prefix, routes) => routes.map(route => {
  route.path = prefix + route.path;
  return route;
});

const routes = [
  {

    redirect: '/guide',
    name: 'layout',
    component: () => import('@/components/Layout.vue')
  },
  ...withPrefix('/guide', [
    {
      path: '/',
      name: 'guide',
      component: () => import('@/views/guide/Index.vue')
    },
    {
      name: 'guide_sub',
      path: '/:guideName',
      component: () => import('@/views/guide/Index.vue')
    }
  ])
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


router.beforeEach(async (to, from, next) => {
    /* 라우터 전처리
    * to:  이동할 URL정보가 담긴 라우터 객체
    * from: 현재 URL정보가 담긴 라우터 객체
    * next : from 에서 to로 이동하기 위해 호출 되야 하는 함수, next()가 호출되기 전에는 이동하지 않음.
    */
  console.log('from ==>', from.fullPath);
  console.log('to ==>', to.fullPath);
  next();
});
export default router;