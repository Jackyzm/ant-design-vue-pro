import Vue from 'vue';
import Router from 'vue-router';
import BasicLayout from '@/components/layouts/BasicLayout';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: ()=> import('@/routes/Dashboard/Analysis'),
        },
        {
            path: '/',
            component: BasicLayout,
            redirect: '/dashboard/analysis',
            children: [
                {
                    path: '/dashboard/analysis',
                    component: ()=> import('@/routes/Dashboard/Analysis'),
                },
                {
                    path: '/dashboard/monitor',
                    component: ()=> import('@/routes/Dashboard/Monitor'),
                },
                {
                    path: '/aaa',
                    component: ()=> import('@/routes/Dashboard/Analysis'),
                },
                {
                    path: '/exception/403',
                    component: ()=> import('@/routes/Exception/403'),
                },
                {
                    path: '/exception/404',
                    component: ()=> import('@/routes/Exception/404'),
                },
                {
                    path: '/exception/500',
                    component: ()=> import('@/routes/Exception/500'),
                },
                {
                    path: '/exception/trigger',
                    component: ()=> import('@/routes/Exception/triggerException'),
                }
            ]
        },
        {
            path: '*',
            redirect: '/',
        }
    ]
})
