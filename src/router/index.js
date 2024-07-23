import { createRouter, createWebHistory } from 'vue-router';
const withPrefix = (prefix, routes) => routes.map(route => {
    route.path = prefix + route.path;
    return route;
});

const routes = [
    {

        redirect: '/guide',
        name: 'layout',
        component: () => import('@/components/Layout.vue'),
        children: [
            {
                path: '/section',
                name: 'SectionPage',
                component: () => import('@/views/sample/SectionPage.vue')

            },

            {
                path: '/boxlayout',
                name: 'BoxLayoutPage',
                component: () => import('@/views/sample/BoxLayoutPage.vue')

            },
            ...withPrefix('/tab', [
                {
                    path: '/',
                    name: 'TabPage',
                    component: () => import('@/views/sample/TabPage.vue')
                },
                {
                    name: 'TabPage_sub',
                    path: '/:tabid',
                    component: () => import('@/views/sample/TabPage.vue')
                }
            ]),
            {
                path: '/table',
                name: 'TablePage',
                component: () => import('@/views/sample/TablePage.vue')
            },
            {
                path: '/title',
                name: 'TitlePage',
                component: () => import('@/views/sample/TitlePage.vue')

            },
            {
                path: '/modal',
                name: 'ModalPage',
                component: () => import('@/views/sample/ModalPage.vue')

            },
            {
                path: '/accordion',
                name: 'AccordionPage',
                component: () => import('@/views/sample/AccordionPage.vue')

            },
            {
                path: '/list',
                name: 'ListPage',
                component: () => import('@/views/sample/ListPage.vue')

            },
            {
                path: '/forminput',
                name: 'FormInputPage',
                component: () => import('@/views/sample/FormInputPage.vue')

            },
            {
                path: '/formradio',
                name: 'FormRadioPage',
                component: () => import('@/views/sample/FormRadioPage.vue')

            },
            {
                path: '/formcheck',
                name: 'FormCheckboxPage',
                component: () => import('@/views/sample/FormCheckboxPage.vue')

            },
            {
                path: '/formselect',
                name: 'FormSelectPage',
                component: () => import('@/views/sample/FormSelectPage.vue')

            },
            {
                path: '/datepicker',
                name: 'DatePickerPage',
                component: () => import('@/views/sample/DatePickerPage.vue')

            },
            {
                path: '/button',
                name: 'ButtonPage',
                component: () => import('@/views/sample/ButtonPage.vue')

            },
            // {
            //     path: '/ckeditor',
            //     name: 'CkeditorPage',
            //     component: () => import('@/views/sample/CkeditorPage.vue')

            // },
            {
                path: '/chart',
                name: 'chartPage',
                component: () => import('@/views/sample/ChartPage.vue')

            },
            {
                path: '/tablelayout',
                name: 'tablelayout',
                component: () => import('@/views/sample/TableLayout.vue')
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/sample/DashBoradPage.vue')
            }
        ]
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